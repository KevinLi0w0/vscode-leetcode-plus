// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { QuickPickItem, window, workspace, WorkspaceConfiguration } from "vscode";
import { languages } from "../shared";
import { t } from "../i18n";

export async function switchDefaultLanguage(): Promise<void> {
    const leetCodeConfig: WorkspaceConfiguration = workspace.getConfiguration("leetcode");
    const defaultLanguage: string | undefined = leetCodeConfig.get<string>("defaultLanguage");
    const languageItems: QuickPickItem[] = [];
    for (const language of languages) {
        languageItems.push({
            label: language,
            description: defaultLanguage === language ? t("currently_used") : undefined,
        });
    }
    // Put the default language at the top of the list
    languageItems.sort((a: QuickPickItem, b: QuickPickItem) => {
        if (a.description) {
            return Number.MIN_SAFE_INTEGER;
        } else if (b.description) {
            return Number.MAX_SAFE_INTEGER;
        }
        return a.label.localeCompare(b.label);
    });

    const selectedItem: QuickPickItem | undefined = await window.showQuickPick(languageItems, {
        placeHolder: t("select_default_language"),
        ignoreFocusOut: true,
    });

    if (!selectedItem) {
        return;
    }

    leetCodeConfig.update("defaultLanguage", selectedItem.label, true /* Global */);
    window.showInformationMessage(t("default_language_set", selectedItem.label));
}
