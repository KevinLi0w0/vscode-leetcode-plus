// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

export const en = {
    // Category names
    category_all: "All",
    category_difficulty: "Difficulty",
    category_tag: "Tag",
    category_company: "Company",
    category_favorite: "Favorite",
    category_study_plan: "Study Plan",
    category_hot100: "Hot 100",

    // Explorer
    sign_in_to_leetcode: "Sign in to LeetCode",
    ac_label: "AC: {0}",
    failed_label: "Failed: {0}",
    total_label: "Total: {0}",

    // Common UI
    open: "Open",
    yes: "Yes",
    no: "No",
    never: "Never",
    sign_up: "Sign up",
    select: "Select",
    dont_show_again: "Don't show again",

    // Sign in
    please_sign_in: "Please sign in to LeetCode.",
    failed_to_obtain_cookie: "Failed to obtain the cookie. Please log in again.",
    failed_to_login: "Failed to log in. Please open the output channel for details.",
    select_language: "Select the language you want to use",
    enter_cookie: "Enter LeetCode Cookie",
    login_success: "Successfully logged in as {0}.",
    signout_success: "Successfully signed out.",

    // Endpoint
    enable_leetcode_us: "Enable LeetCode US",
    enable_leetcode_cn: "Enable LeetCode CN",
    switched_endpoint: "Switched the endpoint to {0}",
    failed_to_switch_endpoint: "Failed to switch endpoint. Please open the output channel for details.",
    failed_to_sign_in_after_switch: "Failed to sign in. Please open the output channel for details.",

    // Sorting
    sorting_none: "None",
    sorting_acceptance_asc: "Acceptance Rate (Ascending)",
    sorting_acceptance_desc: "Acceptance Rate (Descending)",

    // Executor messages
    fetching_solution: "Fetching top voted solution from discussions...",
    fetching_description: "Fetching problem description...",
    submitting_to_leetcode: "Submitting to LeetCode...",
    testing_solution: "Testing solution in LeetCode...",
    updating_favorite: "Updating the favorite list...",
    node_not_found: "LeetCode extension needs Node.js installed in environment path",

    // Error messages
    failed_to_list_problems: "Failed to list problems. Please open the output channel for details.",
    environment_not_met: "The environment doesn't meet requirements.",
    extension_init_failed: "Extension initialization failed. Please open output channel for details.",
    failed_to_fetch_study_plan: "Failed to fetch study plan. Please check your network and endpoint settings.",
    no_problems_in_study_plan: "No problems found in the study plan.",
    failed_to_submit: "Failed to submit the solution. Please open the output channel for details.",
    failed_to_test: "Failed to test the solution. Please open the output channel for details.",
    failed_to_switch_session: "Failed to switch session. Please open the output channel for details.",
    failed_to_list_sessions: "Failed to list sessions. Please open the output channel for details.",
    failed_to_create_session: "Failed to create session. Please open the output channel for details.",
    save_file_first: "Please save the solution file first.",
    test_file_empty: "The selected test file must not be empty.",

    // Misc
    unknown: "Unknown",
    problems: "Problems",

    // Toggle language
    switched_language: "Switched UI language to {0}",
    select_ui_language: "Select UI language",
    language_english: "English",
    language_chinese: "中文",
    language_auto: "Auto (Follow VS Code)",

    // Study plan
    fetching_study_plan: "Fetching study plan...",
    study_plan_not_available: "Study plan is only available on leetcode.cn endpoint.",

    // Node
    preview_problem: "Preview Problem",

    // CodeLens
    codelens_submit: "Submit",
    codelens_test: "Test",
    codelens_star: "Star",
    codelens_unstar: "Unstar",
    codelens_solution: "Solution",
    codelens_description: "Description",
    codelens_submit_passed: "✅ Submit ({0}/{1})",
    codelens_submit_failed: "❌ Submit ({0}/{1})",
    codelens_submit_pending: "⏳ Submitting...",
    codelens_test_passed: "✅ Test ({0}/{1})",
    codelens_test_failed: "❌ Test ({0}/{1})",
    codelens_test_pending: "⏳ Testing...",

    // Submit/Test results
    submit_accepted: "Accepted! Passed {0}/{1} test cases.",
    submit_wrong: "Wrong Answer. Passed {0}/{1} test cases.",
    test_passed: "Test passed: {0}/{1} cases.",
    test_failed: "Test failed: {0}/{1} cases passed.",
    view_details: "View Details",

    // Test options
    test_default: "$(three-bars) Default test cases",
    test_default_desc: "Test with the default cases",
    test_write: "$(pencil) Write directly...",
    test_write_desc: "Write test cases in input box",
    test_browse: "$(file-text) Browse...",
    test_browse_desc: "Test with the written cases in file",
    enter_test_cases: "Enter the test cases.",
    test_case_empty: "Test case must not be empty.",
    test_case_placeholder: "Example: [1,2,3]\\n4",

    // Session
    session_active: "Active",
    session_ac_questions: "AC Questions: {0}, AC Submits: {1}",
    session_create: "$(plus) Create a session",
    session_create_desc: "Click this item to create a session",
    session_delete: "$(trashcan) Delete a session",
    session_delete_desc: "Click this item to DELETE a session",
    session_switched: "Successfully switched to session '{0}'.",
    session_created: "New session created, you can switch to it by clicking the status bar.",
    session_delete_active: "Cannot delete an active session.",
    session_delete_confirm: "This operation cannot be reverted. Are you sure to delete the session: {0}?",
    session_enter_name: "Enter the new session name.",
    session_name_empty: "Session name must not be empty",
    session_select_delete: "Please select the session you want to delete",
    session_enter_yes: "Enter 'yes' to confirm deleting the session",
    session_confirm: "Enter 'yes' to confirm",
    session_deleted: "The session has been successfully deleted.",

    // Workspace
    workspace_not_opened: "The LeetCode workspace folder is not opened in VS Code, would you like to open it?",
    workspace_default: "Default location",
    workspace_select_save: "Select where you would like to save your LeetCode files",
    workspace_just_open: "Just open the problem file",
    workspace_open_current: "Open in current window",
    workspace_open_new: "Open in new window",
    workspace_add: "Add to workspace",

    // Language picker
    select_default_language: "Select the default language",
    currently_used: "Currently used",
    default_language_set: "Successfully set the default language to {0}",

    // Show problem
    select_problem: "Select one problem",
    failed_resolve_id: "Failed to resolve the problem id from file: {0}.",
    failed_resolve_problem: "Failed to resolve the problem with id: {0}.",
    invalid_solution_input: "Invalid input to fetch the solution data.",
    multiple_tags: "Multiple tags available, please select one",
    show_canceled: "Showing problem canceled by user.",

    // Hints
    hint_comment_desc: "You can config how to show the problem description through \"leetcode.showDescription\".",
    hint_open_settings: "Open settings",
    hint_shortcut: "You can customize shortcut key bindings in File > Preferences > Keyboard Shortcuts with query \"leetcode\".",
    hint_open_keybindings: "Open Keybindings",
    hint_webview_markdown: "You can change the webview appearance (\"fontSize\", \"lineWidth\" & \"fontFamily\") in \"markdown.preview\" configuration.",

    // Status bar
    click_to_refresh: "Click to refresh",

    // Local test
    local_test_not_supported: "Local testing is not supported for {0} language.",
    local_test_no_main: "No main function found. Please add a main function with test cases.",
    local_test_config_not_found: "No test environment found for {0}. Please install the corresponding runtime.",
    local_test_success: "Local test passed.",
    local_test_failed: "Local test failed: {0}",
    local_test_running: "Running local test...",
    local_test_title: "LeetCode Local Test",
};
