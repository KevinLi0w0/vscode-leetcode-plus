// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IQuickItemEx } from "../shared";
import { DialogOptions, DialogType, promptForOpenOutputChannel, promptForSignIn } from "../utils/uiUtils";
import { t } from "../i18n";

export async function getSessionList(): Promise<ISession[]> {
    const signInStatus: string | undefined = leetCodeManager.getUser();
    if (!signInStatus) {
        promptForSignIn();
        return [];
    }
    const result: string = await leetCodeExecutor.listSessions();
    const lines: string[] = result.split("\n");
    const sessions: ISession[] = [];
    const reg: RegExp = /(.?)\s*(\d+)\s+(.*)\s+(\d+ \(\s*\d+\.\d+ %\))\s+(\d+ \(\s*\d+\.\d+ %\))/;
    for (const line of lines) {
        const match: RegExpMatchArray | null = line.match(reg);
        if (match && match.length === 6) {
            sessions.push({
                active: !!(match[1].trim()),
                id: match[2].trim(),
                name: match[3].trim(),
                acQuestions: match[4].trim(),
                acSubmits: match[5].trim(),
            });
        }
    }
    return sessions;
}

export async function manageSessions(): Promise<void> {
    const choice: IQuickItemEx<ISession | string> | undefined = await vscode.window.showQuickPick(parseSessionsToPicks(true /* includeOperation */));
    if (!choice || choice.description === "Active") {
        return;
    }
    if (choice.value === ":createSession") {
        await createSession();
        return;
    }
    if (choice.value === ":deleteSession") {
        await deleteSession();
        return;
    }
    try {
        await leetCodeExecutor.enableSession((choice.value as ISession).id);
        vscode.window.showInformationMessage(t("session_switched", choice.label));
        await vscode.commands.executeCommand("leetcode.refreshExplorer");
    } catch (error) {
        await promptForOpenOutputChannel(t("failed_to_switch_session"), DialogType.error);
    }
}

async function parseSessionsToPicks(includeOperations: boolean = false): Promise<Array<IQuickItemEx<ISession | string>>> {
    return new Promise(async (resolve: (res: Array<IQuickItemEx<ISession | string>>) => void): Promise<void> => {
        try {
            const sessions: ISession[] = await getSessionList();
            const picks: Array<IQuickItemEx<ISession | string>> = sessions.map((s: ISession) => Object.assign({}, {
                label: `${s.active ? "$(check) " : ""}${s.name}`,
                description: s.active ? t("session_active") : "",
                detail: t("session_ac_questions", s.acQuestions, s.acSubmits),
                value: s,
            }));

            if (includeOperations) {
                picks.push(...parseSessionManagementOperations());
            }
            resolve(picks);
        } catch (error) {
            return await promptForOpenOutputChannel(t("failed_to_list_sessions"), DialogType.error);
        }
    });
}

function parseSessionManagementOperations(): Array<IQuickItemEx<string>> {
    return [{
        label: t("session_create"),
        description: "",
        detail: t("session_create_desc"),
        value: ":createSession",
    }, {
        label: t("session_delete"),
        description: "",
        detail: t("session_delete_desc"),
        value: ":deleteSession",
    }];
}

async function createSession(): Promise<void> {
    const session: string | undefined = await vscode.window.showInputBox({
        prompt: t("session_enter_name"),
        validateInput: (s: string): string | undefined => s && s.trim() ? undefined : t("session_name_empty"),
    });
    if (!session) {
        return;
    }
    try {
        await leetCodeExecutor.createSession(session);
        vscode.window.showInformationMessage(t("session_created"));
    } catch (error) {
        await promptForOpenOutputChannel(t("failed_to_create_session"), DialogType.error);
    }
}

async function deleteSession(): Promise<void> {
    const choice: IQuickItemEx<ISession | string> | undefined = await vscode.window.showQuickPick(
        parseSessionsToPicks(false /* includeOperation */),
        { placeHolder: t("session_select_delete") },
    );
    if (!choice) {
        return;
    }

    const selectedSession: ISession = choice.value as ISession;
    if (selectedSession.active) {
        vscode.window.showInformationMessage(t("session_delete_active"));
        return;
    }

    const action: vscode.MessageItem | undefined = await vscode.window.showWarningMessage(
        t("session_delete_confirm", selectedSession.name),
        DialogOptions.yes,
        DialogOptions.no,
    );
    if (action !== DialogOptions.yes) {
        return;
    }

    const confirm: string | undefined = await vscode.window.showInputBox({
        prompt: t("session_enter_yes"),
        validateInput: (value: string): string => {
            if (value === "yes") {
                return "";
            } else {
                return t("session_confirm");
            }
        },
    });

    if (confirm === "yes") {
        await leetCodeExecutor.deleteSession(selectedSession.id);
        vscode.window.showInformationMessage(t("session_deleted"));
    }
}

export interface ISession {
    active: boolean;
    id: string;
    name: string;
    acQuestions: string;
    acSubmits: string;
}
