import { URLSearchParams } from "url";
import { FileDecoration, FileDecorationProvider, ProviderResult, ThemeColor, Uri, workspace, WorkspaceConfiguration } from "vscode";

export class LeetCodeTreeItemDecorationProvider implements FileDecorationProvider {
    private readonly DIFFICULTY_BADGE_LABEL: { [key: string]: string } = {
        easy: "E",
        medium: "M",
        hard: "H",
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
            // No color — keeps problem names uniformly white, badge-only difficulty indication
        };
    }

    private isDifficultyBadgeEnabled(): boolean {
        const configuration: WorkspaceConfiguration = workspace.getConfiguration();
        return configuration.get<boolean>("leetcode.colorizeProblems", false);
    }
}

export const leetCodeTreeItemDecorationProvider: LeetCodeTreeItemDecorationProvider = new LeetCodeTreeItemDecorationProvider();
