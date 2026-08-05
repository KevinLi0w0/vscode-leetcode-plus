// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import { LeetCodeNode } from "../explorer/LeetCodeNode";
import { getEditorShortcuts } from "../utils/settingUtils";
import { reviewManager } from "../commands/reviewManager";
import { t } from "../i18n";

export type SubmitStatus = "idle" | "pending" | "passed" | "failed";
export type TestStatus = "idle" | "pending" | "passed" | "failed";

interface ICodeLensState {
    submitStatus: SubmitStatus;
    testStatus: TestStatus;
    submitPassed?: number;
    submitTotal?: number;
    testPassed?: number;
    testTotal?: number;
    submitDetail?: string;
    testDetail?: string;
}

export class CustomCodeLensProvider implements vscode.CodeLensProvider {

    private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    private stateMap: Map<string, ICodeLensState> = new Map(); // key: file uri fsPath

    get onDidChangeCodeLenses(): vscode.Event<void> {
        return this.onDidChangeCodeLensesEmitter.event;
    }

    public refresh(): void {
        this.onDidChangeCodeLensesEmitter.fire();
    }

    public setSubmitStatus(fsPath: string, status: SubmitStatus, passed?: number, total?: number, detail?: string): void {
        let state: ICodeLensState = this.stateMap.get(fsPath) || { submitStatus: "idle", testStatus: "idle" };
        state.submitStatus = status;
        state.submitPassed = passed;
        state.submitTotal = total;
        state.submitDetail = detail;
        this.stateMap.set(fsPath, state);
        this.refresh();
    }

    public setTestStatus(fsPath: string, status: TestStatus, passed?: number, total?: number, detail?: string): void {
        let state: ICodeLensState = this.stateMap.get(fsPath) || { submitStatus: "idle", testStatus: "idle" };
        state.testStatus = status;
        state.testPassed = passed;
        state.testTotal = total;
        state.testDetail = detail;
        this.stateMap.set(fsPath, state);
        this.refresh();
    }

    public provideCodeLenses(document: vscode.TextDocument): vscode.ProviderResult<vscode.CodeLens[]> {
        const shortcuts: string[] = getEditorShortcuts();
        if (!shortcuts) {
            return;
        }

        const content: string = document.getText();
        const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=.*/);
        if (!matchResult) {
            return undefined;
        }
        const nodeId: string | undefined = matchResult[1];
        let node: LeetCodeNode | undefined;
        if (nodeId) {
            node = explorerNodeManager.getNodeById(nodeId);
        }

        let codeLensLine: number = document.lineCount - 1;
        for (let i: number = document.lineCount - 1; i >= 0; i--) {
            const lineContent: string = document.lineAt(i).text;
            if (lineContent.indexOf("@lc code=end") >= 0) {
                codeLensLine = i;
                break;
            }
        }

        const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
        const codeLens: vscode.CodeLens[] = [];
        const state: ICodeLensState = this.stateMap.get(document.uri.fsPath) || { submitStatus: "idle", testStatus: "idle" };

        if (shortcuts.indexOf("submit") >= 0) {
            let title: string = t("codelens_submit");
            switch (state.submitStatus) {
                case "pending":
                    title = t("codelens_submit_pending");
                    break;
                case "passed":
                    title = t("codelens_submit_passed", state.submitPassed || 0, state.submitTotal || 0);
                    break;
                case "failed":
                    title = t("codelens_submit_failed", state.submitPassed || 0, state.submitTotal || 0);
                    break;
            }
            codeLens.push(new vscode.CodeLens(range, {
                title,
                command: "leetcode.submitSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("test") >= 0) {
            let title: string = t("codelens_test");
            switch (state.testStatus) {
                case "pending":
                    title = t("codelens_test_pending");
                    break;
                case "passed":
                    title = t("codelens_test_passed", state.testPassed || 0, state.testTotal || 0);
                    break;
                case "failed":
                    title = t("codelens_test_failed", state.testPassed || 0, state.testTotal || 0);
                    break;
            }
            codeLens.push(new vscode.CodeLens(range, {
                title,
                command: "leetcode.testSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("star") >= 0 && node) {
            codeLens.push(new vscode.CodeLens(range, {
                title: node.isFavorite ? t("codelens_unstar") : t("codelens_star"),
                command: node.isFavorite ? "leetcode.removeFavorite" : "leetcode.addFavorite",
                arguments: [node],
            }));
        }

        // Review mode buttons (always shown)
        codeLens.push(new vscode.CodeLens(range, {
            title: t("codelens_review"),
            command: "leetcode.startReview",
            arguments: [document.uri],
        }));

        if (reviewManager.hasBackup(document.uri.fsPath)) {
            codeLens.push(new vscode.CodeLens(range, {
                title: t("codelens_restore"),
                command: "leetcode.restoreCode",
                arguments: [document.uri],
            }));
        }

        // Mastered toggle
        if (node) {
            const mastered: boolean = reviewManager.isMastered(node.id);
            codeLens.push(new vscode.CodeLens(range, {
                title: mastered ? t("codelens_mastered") : t("codelens_unmastered"),
                command: "leetcode.toggleMastered",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("solution") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: t("codelens_solution"),
                command: "leetcode.showSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("description") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: t("codelens_description"),
                command: "leetcode.previewProblem",
                arguments: [document.uri],
            }));
        }

        return codeLens;
    }

    public getSubmitDetail(fsPath: string): string | undefined {
        return this.stateMap.get(fsPath)?.submitDetail;
    }

    public getTestDetail(fsPath: string): string | undefined {
        return this.stateMap.get(fsPath)?.testDetail;
    }
}

export const customCodeLensProvider: CustomCodeLensProvider = new CustomCodeLensProvider();