// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { customCodeLensProvider } from "../codelens/CustomCodeLensProvider";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { DialogType, promptForOpenOutputChannel, promptForSignIn } from "../utils/uiUtils";
import { getActiveFilePath } from "../utils/workspaceUtils";
import { t } from "../i18n";
import { leetCodeSubmissionProvider } from "../webview/leetCodeSubmissionProvider";
import { reviewManager } from "./reviewManager";

interface ISubmitResult {
    passed: number;
    total: number;
    accepted: boolean;
    detail: string;
}

function parseSubmitResult(raw: string): ISubmitResult {
    // Parse the CLI output to extract pass/total counts and status
    const accepted: boolean = /Accepted/.test(raw) || (/[\u221A\u2714]/.test(raw) && !/[\u00D7\u2718]/.test(raw));

    // Try to find "X/Y" pattern in the output
    const match: RegExpMatchArray | null = raw.match(/(\d+)\s*\/\s*(\d+)/);
    let passed: number = 0;
    let total: number = 0;
    if (match) {
        passed = parseInt(match[1], 10);
        total = parseInt(match[2], 10);
    } else {
        // Count √/✔ marks for passed cases
        const passMarks: RegExpMatchArray | null = raw.match(/[√✔]/g);
        passed = passMarks ? passMarks.length : 0;
        const allMarks: RegExpMatchArray | null = raw.match(/[√✔×✘vx]/gi);
        total = allMarks ? allMarks.length : 0;
    }

    return { passed, total, accepted: accepted || (total > 0 && passed === total), detail: raw };
}

export async function submitSolution(uri?: vscode.Uri): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }

    const filePath: string | undefined = await getActiveFilePath(uri);
    if (!filePath) {
        return;
    }

    // Set pending status
    const fsPath: string = uri?.fsPath || vscode.window.activeTextEditor?.document.uri.fsPath || "";
    if (fsPath) {
        customCodeLensProvider.setSubmitStatus(fsPath, "pending");
    }

    try {
        const result: string = await leetCodeExecutor.submitSolution(filePath);
        const parsed: ISubmitResult = parseSubmitResult(result);

        if (fsPath) {
            if (parsed.accepted) {
                customCodeLensProvider.setSubmitStatus(fsPath, "passed", parsed.passed, parsed.total, parsed.detail);

                // If in redo mode (backup exists), increment review count and clean up backup
                if (reviewManager.hasBackup(fsPath)) {
                    const problemId: string | undefined = reviewManager.getProblemIdFromUri(uri || vscode.window.activeTextEditor!.document.uri);
                    if (problemId) {
                        reviewManager.incrementReviewCount(problemId);
                    }
                    // Delete the backup file and refresh CodeLens so button changes back to "Redo"
                    const backupPath: string = reviewManager.getBackupPath(fsPath);
                    await require("fs-extra").remove(backupPath);
                    customCodeLensProvider.refresh();
                }

                const action: string | undefined = await vscode.window.showInformationMessage(t("submit_accepted", String(parsed.passed), String(parsed.total)), t("view_details"));
                if (action === t("view_details")) {
                    await vscode.commands.executeCommand("leetcode.showSubmitDetail", uri);
                }
            } else {
                customCodeLensProvider.setSubmitStatus(fsPath, "failed", parsed.passed, parsed.total, parsed.detail);
                const action: string | undefined = await vscode.window.showWarningMessage(t("submit_wrong", String(parsed.passed), String(parsed.total)), t("view_details"));
                if (action === t("view_details")) {
                    await vscode.commands.executeCommand("leetcode.showSubmitDetail", uri);
                }
            }
        }
    } catch (error) {
        if (fsPath) {
            customCodeLensProvider.setSubmitStatus(fsPath, "idle");
        }
        await promptForOpenOutputChannel(t("failed_to_submit"), DialogType.error);
        return;
    }

    leetCodeTreeDataProvider.refresh();
}

// Show full detail in webview when user clicks "View Details"
export async function showSubmitDetail(uri?: vscode.Uri): Promise<void> {
    const fsPath: string = uri?.fsPath || vscode.window.activeTextEditor?.document.uri.fsPath || "";
    if (!fsPath) {
        return;
    }
    const detail: string | undefined = customCodeLensProvider.getSubmitDetail(fsPath);
    if (detail) {
        leetCodeSubmissionProvider.show(detail);
    }
}