// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { commands, ViewColumn, workspace } from "vscode";
import { getLeetCodeEndpoint } from "../commands/plugin";
import { reviewManager } from "../commands/reviewManager";
import { Endpoint, IProblem } from "../shared";
import { ILeetCodeWebviewOption, LeetCodeWebview } from "./LeetCodeWebview";
import { markdownEngine } from "./markdownEngine";
import { t } from "../i18n";
import { leetCodeFlashcardView } from "./leetCodeFlashcardView";

class LeetCodePreviewProvider extends LeetCodeWebview {
    protected readonly viewType: string = "leetcode.preview";
    private node: IProblem;
    private description: IDescription;
    private sideMode: boolean = false;

    public isSideMode(): boolean {
        return this.sideMode;
    }

    public show(descString: string, node: IProblem, isSideMode: boolean = false): void {
        this.description = this.parseDescription(descString, node);
        this.node = node;
        this.sideMode = isSideMode;
        // Push flashcard to bottom panel
        leetCodeFlashcardView.updateFlashcard(node.id);
        this.showWebviewInternal();
    }

    protected getWebviewOption(): ILeetCodeWebviewOption {
        if (!this.sideMode) {
            return {
                title: `${this.node.name}: Preview`,
                viewColumn: ViewColumn.One,
            };
        } else {
            const previewOnLeft: boolean = workspace.getConfiguration("leetcode").get<boolean>("editor.previewOnLeft", true);
            return {
                title: "Description",
                viewColumn: previewOnLeft ? ViewColumn.One : ViewColumn.Two,
                preserveFocus: true,
            };
        }
    }

    protected getWebviewContent(): string {
        const button: { element: string; script: string; style: string } = {
            element: `<button id="solve">Code Now</button>`,
            script: `const button = document.getElementById('solve');
                    button.onclick = () => vscode.postMessage({
                        command: 'ShowProblem',
                    });`,
            style: `<style>
                #solve {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    border: 0;
                    margin: 1rem 0;
                    padding: 0.2rem 1rem;
                    color: white;
                    background-color: var(--vscode-button-background);
                }
                #solve:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                #solve:active {
                    border: 0;
                }
                </style>`,
        };
        const { title, url, category, difficulty, likes, dislikes, body } = this.description;
        const head: string = markdownEngine.render(`# [${title}](${url})`);

        // Review info line: show review count and mastered status below the title
        const problemId: string = this.node.id;
        const reviewCount: number = reviewManager.getReviewCount(problemId);
        const isMastered: boolean = reviewManager.isMastered(problemId);
        let reviewInfoHtml: string = "";
        if (reviewCount > 0 || isMastered) {
            const reviewParts: string[] = [];
            if (isMastered) {
                reviewParts.push(t("codelens_mastered"));
            }
            if (reviewCount > 0) {
                reviewParts.push(t("review_count_suffix", String(reviewCount)));
            }
            reviewInfoHtml = markdownEngine.render(`> ${reviewParts.join(" &nbsp; ")}`);
        }

        const info: string = markdownEngine.render(
            [
                `| Category | Difficulty | Likes | Dislikes |`,
                `| :------: | :--------: | :---: | :------: |`,
                `| ${category} | ${difficulty} | ${likes} | ${dislikes} |`,
            ].join("\n")
        );
        const tags: string = [
            `<details>`,
            `<summary><strong>Tags</strong></summary>`,
            markdownEngine.render(this.description.tags.map((tag: string) => `[\`${tag}\`](${this.getTagLink(tag)})`).join(" | ")),
            `</details>`,
        ].join("\n");
        const companies: string = [
            `<details>`,
            `<summary><strong>Companies</strong></summary>`,
            markdownEngine.render(this.description.companies.map((c: string) => `\`${c}\``).join(" | ")),
            `</details>`,
        ].join("\n");
        const links: string = markdownEngine.render(`[Submissions](${this.getSubmissionsLink(url)}) | [Solution](${this.getSolutionsLink(url)})`);

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource: 'unsafe-inline'; style-src vscode-resource: 'unsafe-inline';"/>
                ${markdownEngine.getStyles()}
                ${!this.sideMode ? button.style : ""}
                <style>
                    code { white-space: pre-wrap; }
                </style>
            </head>
            <body>
                ${head}
                ${reviewInfoHtml}
                ${info}
                ${tags}
                ${companies}
                ${body}
                <hr />
                ${links}
                ${!this.sideMode ? button.element : ""}
                <script>
                    const vscode = acquireVsCodeApi();
                    ${!this.sideMode ? button.script : ""}
                </script>
            </body>
            </html>
        `;
    }

    protected onDidDisposeWebview(): void {
        super.onDidDisposeWebview();
        this.sideMode = false;
    }

    protected async onDidReceiveMessage(message: IWebViewMessage): Promise<void> {
        switch (message.command) {
            case "ShowProblem": {
                await commands.executeCommand("leetcode.showProblem", this.node);
                break;
            }
        }
    }

    private parseDescription(descString: string, problem: IProblem): IDescription {
        const [ , , /* title */ url, , , , , , /* tags */ /* langs */ category,
                 difficulty, likes, dislikes, , , , , /* accepted */ /* submissions */ /* testcase */ ...body
        ] = descString.split("\n");
        return {
            title: problem.name,
            url,
            tags: problem.tags,
            companies: problem.companies,
            category: category.slice(2),
            difficulty: difficulty.slice(2),
            likes: likes.split(": ")[1].trim(),
            dislikes: dislikes.split(": ")[1].trim(),
            body: body.join("\n").replace(/<pre>[\r\n]*([^]+?)[\r\n]*<\/pre>/g, "<pre><code>$1</code></pre>"),
        };
    }

    private getTagLink(tag: string): string {
        const endPoint: string = getLeetCodeEndpoint();
        if (endPoint === Endpoint.LeetCodeCN) {
            return `https://leetcode.cn/tag/${tag}?source=vscode`;
        } else {
            return `https://leetcode.com/tag/${tag}?source=vscode`;
        }
    }

    private getSolutionsLink(url: string): string {
        return url.replace("/description/", "/solutions/") + "?source=vscode";
    }
    private getSubmissionsLink(url: string): string {
        return url.replace("/description/", "/submissions/") + "?source=vscode";
    }
}

interface IDescription {
    title: string;
    url: string;
    tags: string[];
    companies: string[];
    category: string;
    difficulty: string;
    likes: string;
    dislikes: string;
    body: string;
}

interface IWebViewMessage {
    command: string;
}

export const leetCodePreviewProvider: LeetCodePreviewProvider = new LeetCodePreviewProvider();