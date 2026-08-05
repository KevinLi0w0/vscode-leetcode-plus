import { URLSearchParams } from "url";
import { FileDecoration, FileDecorationProvider, ProviderResult, ThemeColor, Uri, workspace, WorkspaceConfiguration } from "vscode";

export class LeetCodeTreeItemDecorationProvider implements FileDecorationProvider {
    private readonly DIFFICULTY_BADGE_LABEL: { [key: string]: string } = {
        easy: "E",
        medium: "M",
        hard: "H",
    };

    private readonly BADGE_COLOR: { [key: string]: ThemeColor } = {
        easy: new ThemeColor("charts.green"),
        medium: new ThemeColor("charts.yellow"),
        hard: new ThemeColor("charts.red"),
    };

    public provideFileDecoration(uri: Uri): ProviderResult<FileDecoration>  {
        // Mastered problems: gray out with no badge
        if (uri.scheme === "leetcode-mastered") {
            return {
                color: new ThemeColor("descriptionForeground"),
                tooltip: "Mastered",
            };
        }

        if (!this.isDifficultyBadgeEnabled()) {
            return;
        }

        if (uri.scheme !== "leetcode" && uri.authority !== "problems") {
            return;
        }

        const params: URLSearchParams = new URLSearchParams(uri.query);
        const difficulty: string = params.get("difficulty")!.toLowerCase();
        return {
            badge: this.DIFFICULTY_BADGE_LABEL[difficulty],
            // Badge color only (green/yellow/red), problem name stays default white
            color: this.BADGE_COLOR[difficulty],
        };
    }

    private isDifficultyBadgeEnabled(): boolean {
        const configuration: WorkspaceConfiguration = workspace.getConfiguration();
        return configuration.get<boolean>("leetcode.colorizeProblems", false);
    }
}

export const leetCodeTreeItemDecorationProvider: LeetCodeTreeItemDecorationProvider = new LeetCodeTreeItemDecorationProvider();
