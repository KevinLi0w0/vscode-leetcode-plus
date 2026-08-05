// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as fse from "fs-extra";
import * as vscode from "vscode";
import { customCodeLensProvider } from "../codelens/CustomCodeLensProvider";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IQuickItemEx, UserStatus } from "../shared";
import { isWindows, usingCmd } from "../utils/osUtils";
import { DialogType, promptForOpenOutputChannel, showFileSelectDialog } from "../utils/uiUtils";
import { getActiveFilePath } from "../utils/workspaceUtils";
import * as wsl from "../utils/wslUtils";
import { t } from "../i18n";
import { leetCodeSubmissionProvider } from "../webview/leetCodeSubmissionProvider";

interface ITestResult {
    passed: number;
    total: number;
    accepted: boolean;
    detail: string;
}

function parseTestResult(raw: string): ITestResult {
    const accepted: boolean = /Accepted/.test(raw);

    const match: RegExpMatchArray | null = raw.match(/(\d+)\s*\/\s*(\d+)/);
    let passed: number = 0;
    let total: number = 0;
    if (match) {
        passed = parseInt(match[1], 10);
        total = parseInt(match[2], 10);
    } else {
        const passMarks: RegExpMatchArray | null = raw.match(/[\u221A\u2714]/g);
        passed = passMarks ? passMarks.length : 0;
        const allMarks: RegExpMatchArray | null = raw.match(/[\u221A\u2714\u00D7\u2718vx]/gi);
        total = allMarks ? allMarks.length : 0;
    }

    return { passed, total, accepted: accepted || (total > 0 && passed === total), detail: raw };
}

export async function testSolution(uri?: vscode.Uri): Promise<void> {
    try {
        if (leetCodeManager.getStatus() === UserStatus.SignedOut) {
            return;
        }

        const filePath: string | undefined = await getActiveFilePath(uri);
        if (!filePath) {
            return;
        }

        const fsPath: string = uri?.fsPath || vscode.window.activeTextEditor?.document.uri.fsPath || "";

        const picks: Array<IQuickItemEx<string>> = [];
        picks.push(
            {
                label: t("test_default"),
                description: "",
                detail: t("test_default_desc"),
                value: ":default",
            },
            {
                label: t("test_write"),
                description: "",
                detail: t("test_write_desc"),
                value: ":direct",
            },
            {
                label: t("test_browse"),
                description: "",
                detail: t("test_browse_desc"),
                value: ":file",
            },
        );
        const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks);
        if (!choice) {
            return;
        }

        // Set pending status
        if (fsPath) {
            customCodeLensProvider.setTestStatus(fsPath, "pending");
        }

        let result: string | undefined;
        switch (choice.value) {
            case ":default":
                result = await leetCodeExecutor.testSolution(filePath);
                break;
            case ":direct":
                const testString: string | undefined = await vscode.window.showInputBox({
                    prompt: t("enter_test_cases"),
                    validateInput: (s: string): string | undefined => s && s.trim() ? undefined : t("test_case_empty"),
                    placeHolder: t("test_case_placeholder"),
                    ignoreFocusOut: true,
                });
                if (testString) {
                    result = await leetCodeExecutor.testSolution(filePath, parseTestString(testString));
                } else {
                    if (fsPath) { customCodeLensProvider.setTestStatus(fsPath, "idle"); }
                    return;
                }
                break;
            case ":file":
                const testFile: vscode.Uri[] | undefined = await showFileSelectDialog(filePath);
                if (testFile && testFile.length) {
                    const input: string = (await fse.readFile(testFile[0].fsPath, "utf-8")).trim();
                    if (input) {
                        result = await leetCodeExecutor.testSolution(filePath, parseTestString(input.replace(/\r?\n/g, "\\n")));
                    } else {
                        vscode.window.showErrorMessage(t("test_file_empty"));
                        if (fsPath) { customCodeLensProvider.setTestStatus(fsPath, "idle"); }
                        return;
                    }
                } else {
                    if (fsPath) { customCodeLensProvider.setTestStatus(fsPath, "idle"); }
                    return;
                }
                break;
            default:
                break;
        }
        if (!result) {
            if (fsPath) { customCodeLensProvider.setTestStatus(fsPath, "idle"); }
            return;
        }

        const parsed: ITestResult = parseTestResult(result);
        if (fsPath) {
            if (parsed.accepted) {
                customCodeLensProvider.setTestStatus(fsPath, "passed", parsed.passed, parsed.total, parsed.detail);
                const action: string | undefined = await vscode.window.showInformationMessage(t("test_passed", String(parsed.passed), String(parsed.total)), t("view_details"));
                if (action === t("view_details")) {
                    await vscode.commands.executeCommand("leetcode.showTestDetail", uri);
                }
            } else {
                customCodeLensProvider.setTestStatus(fsPath, "failed", parsed.passed, parsed.total, parsed.detail);
                const action: string | undefined = await vscode.window.showWarningMessage(t("test_failed", String(parsed.passed), String(parsed.total)), t("view_details"));
                if (action === t("view_details")) {
                    await vscode.commands.executeCommand("leetcode.showTestDetail", uri);
                }
            }
        }
    } catch (error) {
        await promptForOpenOutputChannel(t("failed_to_test"), DialogType.error);
    }
}

export async function showTestDetail(uri?: vscode.Uri): Promise<void> {
    const fsPath: string = uri?.fsPath || vscode.window.activeTextEditor?.document.uri.fsPath || "";
    if (!fsPath) {
        return;
    }
    const detail: string | undefined = customCodeLensProvider.getTestDetail(fsPath);
    if (detail) {
        leetCodeSubmissionProvider.show(detail);
    }
}

function parseTestString(test: string): string {
    if (wsl.useWsl() || !isWindows()) {
        return `'${test}'`;
    }

    // In windows and not using WSL
    if (usingCmd()) {
        return `"${test.replace(/"/g, '\\"')}"`;
    } else {
        // Assume using PowerShell
        return `'${test.replace(/"/g, '\\"')}'`;
    }
}