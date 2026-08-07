// Copyright (c) KevinLi0w0. All rights reserved.
// Licensed under the MIT license.

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { globalState } from "../globalState";
import { markdownEngine } from "./markdownEngine";
import { t } from "../i18n";

class LeetCodeFlashcardView implements vscode.WebviewViewProvider {

    private view: vscode.WebviewView | undefined;

    public resolveWebviewView(view: vscode.WebviewView): void {
        this.view = view;
        view.webview.options = {
            enableScripts: true,
        };
        this.updateView();
    }

    public updateFlashcard(problemId: string): void {
        this.updateView(problemId);
    }

    public clearFlashcard(): void {
        this.updateView();
    }

    private updateView(problemId?: string): void {
        if (!this.view) {
            return;
        }

        let cardHtml: string = "";

        if (problemId) {
            try {
                const flashcardPath: string = path.join(globalState.extensionPath, "resources", "flashcards", `${problemId}.md`);
                if (fs.existsSync(flashcardPath)) {
                    const content: string = fs.readFileSync(flashcardPath, "utf-8");
                    cardHtml = markdownEngine.render(content);
                }
            } catch (err) {
                // ignore
            }
        }

        const hasCard: boolean = cardHtml !== "";
        const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode.flashcard");
        const fontSize: number = config.get("fontSize", 14);
        const codeFontSize: number = config.get("codeFontSize", 13);

        if (!hasCard) {
            this.view.webview.html = `
                <!DOCTYPE html>
                <html>
                <head>
                    ${markdownEngine.getStyles()}
                    <style>
                        body {
                            padding: 1rem;
                            font-size: ${fontSize}px;
                            color: var(--vscode-descriptionForeground);
                            text-align: center;
                            margin-top: 2rem;
                        }
                    </style>
                </head>
                <body>
                    ${problemId ? t("flashcard_not_available") : t("flashcard_no_problem")}
                </body>
                </html>
            `;
            return;
        }

        this.view.webview.html = `
            <!DOCTYPE html>
            <html>
            <head>
                ${markdownEngine.getStyles()}
                <style>
                    /* highlight.js GitHub Dark theme for syntax coloring */
                    .hljs { display: block; overflow-x: auto; padding: 0.5em; color: #c9d1d9; background: #161b22; }
                    .hljs-comment, .hljs-quote { color: #8b949e; font-style: italic; }
                    .hljs-keyword, .hljs-selector-tag, .hljs-type, .hljs-literal, .hljs-name, .hljs-attribute { color: #ff7b72; }
                    .hljs-string, .hljs-regexp, .hljs-addition { color: #a5d6ff; }
                    .hljs-number, .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal, .hljs-type, .hljs-params { color: #79c0ff; }
                    .hljs-function .hljs-title, .hljs-section, .hljs-selector-id { color: #d2a8ff; }
                    .hljs-title.function_ { color: #d2a8ff; }
                    .hljs-tag { color: #7ee787; }
                    .hljs-deletion { color: #ffa657; }
                    .hljs-variable, .hljs-template-variable { color: #ffa657; }
                    .hljs-link { color: #a5d6ff; font-decoration: underline; }
                    .hljs-emphasis { font-style: italic; }
                    .hljs-strong { font-weight: bold; }

                    body {
                        font-size: ${fontSize}px;
                        line-height: 1.6;
                        padding: 0.8rem 1.2rem;
                        margin: 0;
                    }
                    pre {
                        font-size: ${codeFontSize}px;
                        line-height: 1.5;
                        overflow-x: auto;
                        background: #161b22 !important;
                        padding: 0.8em 1em;
                        border-radius: 6px;
                    }
                    pre code, code {
                        font-family: 'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
                        font-size: ${codeFontSize}px;
                    }
                    code {
                        background: rgba(110,118,129,0.2);
                        padding: 0.1em 0.3em;
                        border-radius: 3px;
                    }
                    /* Remove zebra striping from built-in styles */
                    pre code {
                        background: none;
                        padding: 0;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        font-size: ${fontSize}px;
                    }
                    th, td {
                        border: 1px solid var(--vscode-panel-border);
                        padding: 4px 8px;
                        text-align: left;
                    }
                    th {
                        background: var(--vscode-editor-inactiveSelectionBackground);
                    }
                    h2 {
                        margin-top: 1em;
                        margin-bottom: 0.3em;
                        border-bottom: 1px solid var(--vscode-panel-border);
                        padding-bottom: 0.2em;
                    }
                </style>
            </head>
            <body>
                ${cardHtml}
            </body>
            </html>
        `;
    }
}

export const leetCodeFlashcardView: LeetCodeFlashcardView = new LeetCodeFlashcardView();