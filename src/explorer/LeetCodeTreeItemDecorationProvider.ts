import { FileDecoration, FileDecorationProvider, ProviderResult, ThemeColor, Uri } from "vscode";

export class LeetCodeTreeItemDecorationProvider implements FileDecorationProvider {
    public provideFileDecoration(uri: Uri): ProviderResult<FileDecoration>  {
        // Mastered problems: gray out the entire row
        if (uri.scheme === "leetcode-mastered") {
            return {
                color: new ThemeColor("descriptionForeground"),
                tooltip: "Mastered",
            };
        }
        // No badge/color for normal problems — difficulty is shown via emoji in label
        return undefined;
    }
}

export const leetCodeTreeItemDecorationProvider: LeetCodeTreeItemDecorationProvider = new LeetCodeTreeItemDecorationProvider();
