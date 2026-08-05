// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as path from "path";
import * as vscode from "vscode";
import { customCodeLensProvider } from "../codelens/CustomCodeLensProvider";
import { t } from "../i18n";

interface ILangRuntime {
    cmd: string | undefined;
    args: (file: string) => string[];
    name: string;
}

// Language to runtime mapping
const langRuntimeMap: { [ext: string]: ILangRuntime } = {
    ".py": { cmd: "python3", args: (f: string) => [f], name: "Python3" },
    ".js": { cmd: "node", args: (f: string) => [f], name: "JavaScript" },
    ".ts": { cmd: "npx", args: (f: string) => ["ts-node", f], name: "TypeScript" },
    ".go": { cmd: "go", args: (f: string) => ["run", f], name: "Go" },
    ".java": { cmd: "java", args: (f: string) => [f], name: "Java" },
    ".c": { cmd: undefined, args: () => [], name: "C" },
    ".cpp": { cmd: undefined, args: () => [], name: "C++" },
    ".rb": { cmd: "ruby", args: (f: string) => [f], name: "Ruby" },
    ".rs": { cmd: undefined, args: () => [], name: "Rust" },
    ".php": { cmd: "php", args: (f: string) => [f], name: "PHP" },
};

export async function runLocalTest(uri?: vscode.Uri): Promise<void> {
    const document: vscode.TextDocument | undefined = uri
        ? await vscode.workspace.openTextDocument(uri)
        : vscode.window.activeTextEditor?.document;

    if (!document) {
        return;
    }

    const filePath: string = document.uri.fsPath;
    const ext: string = path.extname(filePath);
    const runtime: ILangRuntime | undefined = langRuntimeMap[ext];

    if (!runtime || !runtime.cmd) {
        vscode.window.showWarningMessage(t("local_test_not_supported", ext));
        return;
    }

    const fsPath: string = document.uri.fsPath;

    // Set pending status on CodeLens
    customCodeLensProvider.setTestStatus(fsPath, "pending");

    const terminal: vscode.Terminal = vscode.window.createTerminal(t("local_test_title"));
    terminal.show();

    // Run the code
    terminal.sendText(`echo "▶ ${t("local_test_running")}"`);
    terminal.sendText(`${runtime.cmd} ${runtime.args(filePath).join(" ")}`);
}

export function hasMainFunction(content: string, ext: string): boolean {
    switch (ext) {
        case ".py":
            return /if\s+__name__\s*==\s*['"]__main__['"]/.test(content);
        case ".js":
        case ".ts":
            return /function\s+main\s*\(/.test(content) || /;\s*$/.test(content.trim());
        case ".go":
            return /func\s+main\s*\(\)/.test(content);
        case ".java":
            return /public\s+static\s+void\s+main\s*\(/.test(content);
        case ".c":
        case ".cpp":
            return /int\s+main\s*\(/.test(content);
        case ".rb":
            return /def\s+main\b/.test(content) || /__END__/.test(content);
        case ".rs":
            return /fn\s+main\s*\(\)/.test(content);
        case ".php":
            return true;
        default:
            return true;
    }
}
