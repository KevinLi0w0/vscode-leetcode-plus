// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { reviewManager } from "./reviewManager";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";
import { t } from "../i18n";

export async function startReview(uri?: vscode.Uri): Promise<void> {
    const fileUri: vscode.Uri | undefined = uri || vscode.window.activeTextEditor?.document.uri;
    if (!fileUri) {
        return;
    }

    // Backup current code
    await reviewManager.backupCode(fileUri.fsPath);
    // Clear code between @lc markers
    await reviewManager.clearCode(fileUri.fsPath);

    // Reload the file in editor
    const doc: vscode.TextDocument = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc, { preview: false });

    vscode.window.showInformationMessage(t("review_started"));
}

export async function restoreCode(uri?: vscode.Uri): Promise<void> {
    const fileUri: vscode.Uri | undefined = uri || vscode.window.activeTextEditor?.document.uri;
    if (!fileUri) {
        return;
    }

    if (!reviewManager.hasBackup(fileUri.fsPath)) {
        vscode.window.showWarningMessage(t("review_backup_not_found"));
        return;
    }

    await reviewManager.restoreCode(fileUri.fsPath);

    // Reload the file in editor
    const doc: vscode.TextDocument = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc, { preview: false });

    vscode.window.showInformationMessage(t("review_restored"));
}

export async function toggleMastered(uri?: vscode.Uri): Promise<void> {
    const fileUri: vscode.Uri | undefined = uri || vscode.window.activeTextEditor?.document.uri;
    if (!fileUri) {
        return;
    }

    const problemId: string | undefined = reviewManager.getProblemIdFromUri(fileUri);
    if (!problemId) {
        return;
    }

    const isMastered: boolean = reviewManager.toggleMastered(problemId);
    vscode.window.showInformationMessage(isMastered ? t("review_mastered") : t("review_unmastered"));
    leetCodeTreeDataProvider.refresh();
}
