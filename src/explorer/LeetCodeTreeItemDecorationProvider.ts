import { URLSearchParams } from "url";
import { FileDecoration, FileDecorationProvider, ProviderResult, ThemeColor, Uri } from "vscode";

export class LeetCodeTreeItemDecorationProvider implements FileDecorationProvider {
    private readonly DIFFICULTY_BADGE: { [key: string]: { label: string; color: ThemeColor } } = {
        easy: { label: "E", color: new ThemeColor("charts.green") },
        medium: { label: "M", color: new ThemeColor("charts.yellow") },
        hard: { label: "H", color: new ThemeColor("charts.red") },
    };

    public provideFileDecoration(uri: Uri): ProviderResult<FileDecoration> {
        // Mastered problems: gray out the entire row, no badge
        if (uri.scheme === "leetcode-mastered") {
            return {
                color: new ThemeColor("descriptionForeground"),
                tooltip: "Mastered",
            };
        }

        // Normal problems: show difficulty badge (E/M/H) on the right
        if (uri.scheme === "leetcode" && uri.authority === "problems") {
            const params: URLSearchParams = new URLSearchParams(uri.query);
            const difficulty: string | null = params.get("difficulty");
            if (difficulty) {
                const badge = this.DIFFICULTY_BADGE[difficulty.toLowerCase()];
                if (badge) {
                    return {
                        badge: badge.label,
                        tooltip: difficulty,
                    };
                }
            }
        }

        return undefined;
    }
}

export const leetCodeTreeItemDecorationProvider: LeetCodeTreeItemDecorationProvider = new LeetCodeTreeItemDecorationProvider();