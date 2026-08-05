// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as fse from "fs-extra";
import * as vscode from "vscode";

const REVIEW_COUNT_KEY = "leetcode.review.counts";
const MASTERED_KEY = "leetcode.review.mastered";

class ReviewManager {
    private context: vscode.ExtensionContext | undefined;

    public initialize(context: vscode.ExtensionContext): void {
        this.context = context;
    }

    // --- Review Count ---

    public getReviewCount(problemId: string): number {
        if (!this.context) { return 0; }
        const counts: { [id: string]: number } = this.context.globalState.get<{ [id: string]: number }>(REVIEW_COUNT_KEY, {});
        return counts[problemId] || 0;
    }

    public incrementReviewCount(problemId: string): void {
        if (!this.context) { return; }
        const counts: { [id: string]: number } = this.context.globalState.get<{ [id: string]: number }>(REVIEW_COUNT_KEY, {});
        counts[problemId] = (counts[problemId] || 0) + 1;
        this.context.globalState.update(REVIEW_COUNT_KEY, counts);
    }

    // --- Mastered Status ---

    public isMastered(problemId: string): boolean {
        if (!this.context) { return false; }
        const mastered: { [id: string]: boolean } = this.context.globalState.get<{ [id: string]: boolean }>(MASTERED_KEY, {});
        return !!mastered[problemId];
    }

    public toggleMastered(problemId: string): boolean {
        if (!this.context) { return false; }
        const mastered: { [id: string]: boolean } = this.context.globalState.get<{ [id: string]: boolean }>(MASTERED_KEY, {});
        const newState: boolean = !mastered[problemId];
        if (newState) {
            mastered[problemId] = true;
        } else {
            delete mastered[problemId];
        }
        this.context.globalState.update(MASTERED_KEY, mastered);
        return newState;
    }

    // --- Code Backup ---

    public getBackupPath(filePath: string): string {
        return filePath + ".review_backup";
    }

    public hasBackup(filePath: string): boolean {
        return fse.pathExistsSync(this.getBackupPath(filePath));
    }

    public async backupCode(filePath: string): Promise<void> {
        const backupPath: string = this.getBackupPath(filePath);
        const content: string = await fse.readFile(filePath, "utf-8");
        await fse.writeFile(backupPath, content, "utf-8");
    }

    public async restoreCode(filePath: string): Promise<void> {
        const backupPath: string = this.getBackupPath(filePath);
        if (!fse.pathExistsSync(backupPath)) {
            return;
        }
        const content: string = await fse.readFile(backupPath, "utf-8");
        await fse.writeFile(filePath, content, "utf-8");
        await fse.remove(backupPath);
    }

    public async clearCode(filePath: string): Promise<void> {
        const content: string = await fse.readFile(filePath, "utf-8");
        // Find @lc code=begin and @lc code=end, clear everything between them
        const beginIdx: number = content.indexOf("@lc code=begin");
        const endIdx: number = content.indexOf("@lc code=end");
        if (beginIdx >= 0 && endIdx >= 0) {
            const before: string = content.substring(0, beginIdx);
            const after: string = content.substring(endIdx);
            const newContent: string = before + "@lc code=begin\n\n" + after;
            await fse.writeFile(filePath, newContent, "utf-8");
        } else {
            // Just clear the whole file
            await fse.writeFile(filePath, "", "utf-8");
        }
    }

    // --- Problem ID from file ---

    public getProblemIdFromUri(uri: vscode.Uri): string | undefined {
        if (!uri) { return undefined; }
        const content: string = require("fs").readFileSync(uri.fsPath, "utf-8");
        const match: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=.*/);
        return match ? match[1] : undefined;
    }
}

export const reviewManager: ReviewManager = new ReviewManager();
