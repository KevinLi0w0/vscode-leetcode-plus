// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { UserStatus } from "../shared";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import { LeetCodeNode } from "../explorer/LeetCodeNode";
import { ProblemState } from "../shared";
import { t } from "../i18n";

export class LeetCodeStatusBarItem implements vscode.Disposable {
    private readonly statusBarItem: vscode.StatusBarItem;
    private readonly progressBarItem: vscode.StatusBarItem;
    private currentUser: string | undefined;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
        this.statusBarItem.command = "leetcode.manageSessions";

        this.progressBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 9);
        this.progressBarItem.command = "leetcode.refreshExplorer";
        this.progressBarItem.tooltip = t("click_to_refresh");
    }

    public updateStatusBar(status: UserStatus, user?: string): void {
        this.currentUser = user;
        switch (status) {
            case UserStatus.SignedIn:
                this.statusBarItem.text = `$(check) LeetCode: ${user}`;
                this.updateProgress();
                break;
            case UserStatus.SignedOut:
            default:
                this.statusBarItem.text = "$(sign-in) LeetCode: " + t("sign_in_to_leetcode");
                this.progressBarItem.text = "";
                break;
        }
    }

    public updateProgress(): void {
        if (!this.currentUser) {
            this.progressBarItem.text = "";
            return;
        }

        const allNodes: LeetCodeNode[] = explorerNodeManager.getAllNodesRaw();
        if (allNodes.length === 0) {
            this.progressBarItem.text = "";
            return;
        }

        let acCount: number = 0;
        for (const node of allNodes) {
            if (node.state === ProblemState.AC) {
                acCount++;
            }
        }
        const total: number = allNodes.length;

        // Status bar: $(check) 35/2500  $(book) Hot100: 12/100
        let text: string = `$(check) ${acCount}/${total}`;

        // Append study plan progress
        const studyPlanProgress: string = explorerNodeManager.getStudyPlanProgress();
        if (studyPlanProgress) {
            text += `  $(book) ${studyPlanProgress}`;
        }

        this.progressBarItem.text = text;
    }

    public show(): void {
        this.statusBarItem.show();
        this.progressBarItem.show();
    }

    public hide(): void {
        this.statusBarItem.hide();
        this.progressBarItem.hide();
    }

    public dispose(): void {
        this.statusBarItem.dispose();
        this.progressBarItem.dispose();
    }
}
