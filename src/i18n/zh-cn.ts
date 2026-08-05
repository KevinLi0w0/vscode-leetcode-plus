// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

export const zhCN = {
    // Category names
    category_all: "全部",
    category_difficulty: "难度",
    category_tag: "标签",
    category_company: "公司",
    category_favorite: "收藏",
    category_study_plan: "学习计划",
    category_hot100: "热题 100",

    // Explorer
    sign_in_to_leetcode: "登录 LeetCode",
    ac_label: "已通过: {0}",
    failed_label: "未通过: {0}",
    total_label: "总计: {0}",

    // Common UI
    open: "打开",
    yes: "是",
    no: "否",
    never: "不再提示",
    sign_up: "注册",
    select: "选择",
    dont_show_again: "不再显示",

    // Sign in
    please_sign_in: "请登录 LeetCode。",
    failed_to_obtain_cookie: "获取 Cookie 失败，请重新登录。",
    failed_to_login: "登录失败，请打开输出通道查看详情。",
    select_language: "选择你要使用的编程语言",
    enter_cookie: "输入 LeetCode Cookie",
    login_success: "登录成功：{0}",
    signout_success: "已退出登录。",

    // Endpoint
    enable_leetcode_us: "启用 LeetCode 国际站",
    enable_leetcode_cn: "启用 LeetCode 中国版",
    switched_endpoint: "已切换站点至 {0}",
    failed_to_switch_endpoint: "切换站点失败，请打开输出通道查看详情。",
    failed_to_sign_in_after_switch: "登录失败，请打开输出通道查看详情。",

    // Sorting
    sorting_none: "无",
    sorting_acceptance_asc: "通过率（升序）",
    sorting_acceptance_desc: "通过率（降序）",

    // Executor messages
    fetching_solution: "正在获取题解...",
    fetching_description: "正在获取题目描述...",
    submitting_to_leetcode: "正在提交到 LeetCode...",
    testing_solution: "正在测试代码...",
    updating_favorite: "正在更新收藏列表...",
    node_not_found: "LeetCode 插件需要 Node.js 已安装在环境变量中",

    // Error messages
    failed_to_list_problems: "获取题目列表失败，请打开输出通道查看详情。",
    environment_not_met: "环境不满足要求。",
    extension_init_failed: "插件初始化失败，请打开输出通道查看详情。",
    failed_to_fetch_study_plan: "获取学习计划失败，请检查网络和站点设置。",
    no_problems_in_study_plan: "学习计划中没有找到题目。",
    failed_to_submit: "提交失败，请打开输出通道查看详情。",
    failed_to_test: "测试失败，请打开输出通道查看详情。",
    failed_to_switch_session: "切换会话失败，请打开输出通道查看详情。",
    failed_to_list_sessions: "获取会话列表失败，请打开输出通道查看详情。",
    failed_to_create_session: "创建会话失败，请打开输出通道查看详情。",
    save_file_first: "请先保存代码文件。",
    test_file_empty: "选择的测试文件不能为空。",

    // Misc
    unknown: "未知",
    problems: "题目",

    // Toggle language
    switched_language: "已切换界面语言至 {0}",
    select_ui_language: "选择界面语言",
    language_english: "English",
    language_chinese: "中文",
    language_auto: "自动（跟随 VS Code）",

    // Study plan
    fetching_study_plan: "正在获取学习计划...",
    study_plan_not_available: "学习计划仅在 leetcode.cn 站点可用。",

    // Node
    preview_problem: "预览题目",

    // CodeLens
    codelens_submit: "🟡 提交",
    codelens_test: "🟡 测试",
    codelens_star: "收藏",
    codelens_unstar: "取消收藏",
    codelens_solution: "题解",
    codelens_description: "题目描述",
    codelens_submit_passed: "✅ 提交 ({0}/{1})",
    codelens_submit_failed: "❌ 提交 ({0}/{1})",
    codelens_submit_pending: "⏳ 提交中...",
    codelens_test_passed: "✅ 测试 ({0}/{1})",
    codelens_test_failed: "❌ 测试 ({0}/{1})",
    codelens_test_pending: "⏳ 测试中...",

    // Submit/Test results
    submit_accepted: "通过！{0}/{1} 个测试用例全部通过。",
    submit_wrong: "答案错误。通过 {0}/{1} 个测试用例。",
    test_passed: "测试通过：{0}/{1} 个用例。",
    test_failed: "测试失败：通过 {0}/{1} 个用例。",
    view_details: "查看详情",

    // Test options
    test_default: "$(three-bars) 默认测试用例",
    test_default_desc: "使用默认用例测试",
    test_write: "$(pencil) 直接输入...",
    test_write_desc: "在输入框中编写测试用例",
    test_browse: "$(file-text) 浏览文件...",
    test_browse_desc: "使用文件中的测试用例",
    enter_test_cases: "输入测试用例",
    test_case_empty: "测试用例不能为空",
    test_case_placeholder: "示例: [1,2,3]\\n4",

    // Session
    session_active: "活跃",
    session_ac_questions: "通过题目: {0}, 通过提交: {1}",
    session_create: "$(plus) 创建会话",
    session_create_desc: "点击此项创建新会话",
    session_delete: "$(trashcan) 删除会话",
    session_delete_desc: "点击此项删除会话",
    session_switched: "已切换到会话 '{0}'。",
    session_created: "新会话已创建，可点击状态栏切换。",
    session_delete_active: "无法删除当前活跃会话。",
    session_delete_confirm: "此操作不可撤销。确认删除会话: {0}？",
    session_enter_name: "输入新会话名称",
    session_name_empty: "会话名称不能为空",
    session_select_delete: "请选择要删除的会话",
    session_enter_yes: "输入 'yes' 确认删除会话",
    session_confirm: "输入 'yes' 确认",
    session_deleted: "会话已成功删除。",

    // Workspace
    workspace_not_opened: "LeetCode 工作区未在 VS Code 中打开，是否打开？",
    workspace_default: "默认位置",
    workspace_select_save: "选择 LeetCode 文件保存位置",
    workspace_just_open: "只打开题目文件",
    workspace_open_current: "在当前窗口打开",
    workspace_open_new: "在新窗口打开",
    workspace_add: "添加到工作区",

    // Language picker
    select_default_language: "选择默认编程语言",
    currently_used: "当前使用",
    default_language_set: "已设置默认语言为 {0}",

    // Show problem
    select_problem: "选择一道题目",
    failed_resolve_id: "无法从文件解析题目 ID: {0}。",
    failed_resolve_problem: "无法找到 ID 为 {0} 的题目。",
    invalid_solution_input: "无效的输入，无法获取题解数据。",
    multiple_tags: "有多个标签可用，请选择一个",
    show_canceled: "已取消显示题目。",

    // Hints
    hint_comment_desc: "你可以通过 \"leetcode.showDescription\" 配置题目描述的显示方式。",
    hint_open_settings: "打开设置",
    hint_shortcut: "你可以在 文件 > 首选项 > 键盘快捷方式 中搜索 \"leetcode\" 自定义快捷键。",
    hint_open_keybindings: "打开快捷键设置",
    hint_webview_markdown: "你可以在 \"markdown.preview\" 配置中修改预览外观（字号、行宽、字体）。",

    // Status bar
    click_to_refresh: "点击刷新",

    // Local test
    local_test_not_supported: "不支持 {0} 语言的本地测试。",
    local_test_no_main: "未找到 main 函数。请添加一个包含测试用例的 main 函数。",
    local_test_config_not_found: "未找到 {0} 的测试环境。请安装对应的运行时。",
    local_test_success: "本地测试通过。",
    local_test_failed: "本地测试失败: {0}",
    local_test_running: "正在运行本地测试...",
    local_test_title: "LeetCode 本地测试",
};
