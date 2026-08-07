// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";

export interface IQuickItemEx<T> extends vscode.QuickPickItem {
    value: T;
}

export enum UserStatus {
    SignedIn = 1,
    SignedOut = 2,
}

export const loginArgsMapping: Map<string, string> = new Map([
    ["LeetCode", "-l"],
    ["Cookie", "-c"],
    ["GitHub", "-g"],
    ["LinkedIn", "-i"],
]);

export const languages: string[] = [
    "bash",
    "c",
    "cpp",
    "csharp",
    "golang",
    "java",
    "javascript",
    "kotlin",
    "mysql",
    "php",
    "python",
    "python3",
    "ruby",
    "rust",
    "scala",
    "swift",
    "typescript",
];

export const langExt: Map<string, string> = new Map([
    ["bash", "sh"],
    ["c", "c"],
    ["cpp", "cpp"],
    ["csharp", "cs"],
    ["golang", "go"],
    ["java", "java"],
    ["javascript", "js"],
    ["kotlin", "kt"],
    ["mysql", "sql"],
    ["php", "php"],
    ["python", "py"],
    ["python3", "py"],
    ["ruby", "rb"],
    ["rust", "rs"],
    ["scala", "scala"],
    ["swift", "swift"],
    ["typescript", "ts"],
]);

export enum ProblemState {
    AC = 1,
    NotAC = 2,
    Unknown = 3,
    Locked = 4,
}

export enum Endpoint {
    LeetCode = "leetcode",
    LeetCodeCN = "leetcode-cn",
}

export interface IProblem {
    isFavorite: boolean;
    locked: boolean;
    state: ProblemState;
    id: string;
    name: string;
    difficulty: string;
    passRate: string;
    companies: string[];
    tags: string[];
}

export const defaultProblem: IProblem = {
    isFavorite: false,
    locked: false,
    state: ProblemState.Unknown,
    id: "",
    name: "",
    difficulty: "",
    passRate: "",
    companies: [] as string[],
    tags: [] as string[],
};

export enum Category {
    All = "All",
    Difficulty = "Difficulty",
    Tag = "Tag",
    Company = "Company",
    Favorite = "Favorite",
    StudyPlan = "StudyPlan",
}

export interface IStudyPlanItem {
    slug: string;
    name: string;
}

// Hot 100 topic groupings (matches leetcode.cn/studyplan/top-100-liked/)
export interface IStudyPlanTopic {
    name: string;
    i18nKey?: string;
    problemIds: string[];
}

export const HOT100_TOPICS: IStudyPlanTopic[] = [
    { name: "哈希", i18nKey: "topic_hash", problemIds: ["1", "49", "128"] },
    { name: "双指针", i18nKey: "topic_two_pointers", problemIds: ["11", "15", "42"] },
    { name: "滑动窗口", i18nKey: "topic_sliding_window", problemIds: ["3", "438"] },
    { name: "子串", i18nKey: "topic_substring", problemIds: ["560", "239", "76"] },
    { name: "普通数组", i18nKey: "topic_array", problemIds: ["53", "56", "189", "238", "41"] },
    { name: "矩阵", i18nKey: "topic_matrix", problemIds: ["73", "54", "48", "240"] },
    { name: "链表", i18nKey: "topic_linked_list", problemIds: ["206", "19", "24", "25", "148", "23", "138", "141", "142", "160"] },
    { name: "二叉树", i18nKey: "topic_binary_tree", problemIds: ["94", "104", "226", "101", "543", "102", "108", "98", "230", "199", "114", "105", "236", "124"] },
    { name: "图论", i18nKey: "topic_graph", problemIds: ["200", "994", "207", "208"] },
    { name: "回溯", i18nKey: "topic_backtracking", problemIds: ["46", "78", "17", "39", "22", "79", "131", "51"] },
    { name: "二分查找", i18nKey: "topic_binary_search", problemIds: ["33", "34", "153", "4"] },
    { name: "栈", i18nKey: "topic_stack", problemIds: ["20", "155", "394", "739", "84"] },
    { name: "堆", i18nKey: "topic_heap", problemIds: ["215", "347", "295"] },
    { name: "贪心算法", i18nKey: "topic_greedy", problemIds: ["121", "122", "55", "45", "763"] },
    { name: "动态规划", i18nKey: "topic_dp", problemIds: ["70", "118", "198", "279", "300", "322", "139", "152", "32"] },
    { name: "多维动态规划", i18nKey: "topic_multi_dp", problemIds: ["62", "64", "5", "1143", "72"] },
    { name: "技巧", i18nKey: "topic_techniques", problemIds: ["136", "169", "75", "31", "287"] },
];

export const supportedPlugins: string[] = ["company", "solution.discuss", "leetcode.cn"];

export enum DescriptionConfiguration {
    InWebView = "In Webview",
    InFileComment = "In File Comment",
    Both = "Both",
    None = "None",
}

export const leetcodeHasInited: string = "leetcode.hasInited";

export enum SortingStrategy {
    None = "None",
    AcceptanceRateAsc = "Acceptance Rate (Ascending)",
    AcceptanceRateDesc = "Acceptance Rate (Descending)",
    FrequencyAsc = "Frequency (Ascending)",
    FrequencyDesc = "Frequency (Descending)",
}

export const PREMIUM_URL_CN = "https://leetcode.cn/premium-payment/?source=vscode";
export const PREMIUM_URL_GLOBAL = "https://leetcode.com/subscribe/?ref=lp_pl&source=vscode";

// Auto-detect IDE protocol scheme:
// vscode.env.uriScheme returns the correct callback protocol for each editor:
//   VS Code       → "vscode"
//   VS Code Insiders → "vscode-insiders"
//   CodeFuse      → "codefuse"
//   Cursor        → "cursor"
//   Windsurf      → "windsurf"
// Any VS Code-based IDE is automatically supported.
const protocol: string = vscode.env.uriScheme || "vscode";

// Extension ID used for OAuth callback routing
const extensionId: string = "KevinLi0w0.vscode-leetcode-plus";

export const urls = {
    // base urls
    base: "https://leetcode.com",
    graphql: "https://leetcode.com/graphql",
    userGraphql: "https://leetcode.com/graphql",
    login: "https://leetcode.com/accounts/login/",
    authLoginUrl: `https://leetcode.com/authorize-login/${protocol}/?path=${extensionId}`,
};

export const urlsCn = {
    // base urls
    base: "https://leetcode.cn",
    graphql: "https://leetcode.cn/graphql",
    userGraphql: "https://leetcode.cn/graphql/",
    login: "https://leetcode.cn/accounts/login/",
    authLoginUrl: `https://leetcode.cn/authorize-login/${protocol}/?path=${extensionId}`,
};

export const getUrl = (key: string) => {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode");
    const point = leetCodeConfig.get<string>("endpoint", Endpoint.LeetCode);
    switch (point) {
        case Endpoint.LeetCodeCN:
            return urlsCn[key];
        case Endpoint.LeetCode:
        default:
            return urls[key];
    }
};
