// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { reviewManager } from "./reviewManager";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";
import { customCodeLensProvider } from "../codelens/CustomCodeLensProvider";
import { t } from "../i18n";

export async function toggleRedo(uri?: vscode.Uri): Promise<void> {
    const fileUri: vscode.Uri | undefined = uri || vscode.window.activeTextEditor?.document.uri;
    if (!fileUri) {
        return;
    }

    const hasBackup: boolean = reviewManager.hasBackup(fileUri.fsPath);

    if (hasBackup) {
        // Currently in redo mode → Restore code
        await reviewManager.restoreCode(fileUri.fsPath);

        // Reload the file in editor
        const doc: vscode.TextDocument = await vscode.workspace.openTextDocument(fileUri);
        await vscode.window.showTextDocument(doc, { preview: false });

        vscode.window.showInformationMessage(t("review_restored"));
    } else {
        // Not in redo mode → Start redo: backup current code, then clear
        await reviewManager.backupCode(fileUri.fsPath);
        await reviewManager.clearCode(fileUri.fsPath);

        // Reload the file in editor
        const doc: vscode.TextDocument = await vscode.workspace.openTextDocument(fileUri);
        await vscode.window.showTextDocument(doc, { preview: false });

        vscode.window.showInformationMessage(t("review_started"));
    }

    // Refresh CodeLens to update button text
    customCodeLensProvider.refresh();
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
