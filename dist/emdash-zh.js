(function () {
  'use strict';

  var STATE = {
    version: '1.2.1',
    totalTranslations: 0,
    totalMutations: 0,
    totalScans: 0,
    slowOps: 0,
    errors: 0,
    startTime: Date.now(),
    lastScanMs: 0,
    peakScanMs: 0,
    untranslated: {}
  };
  window.__EMDASH_ZH__ = STATE;

  function log(level, msg, data) {
    try {
      if (window.electronAPI && window.electronAPI.invoke) {
        window.electronAPI.invoke('emdash-zh:log', { t: Date.now() - STATE.startTime, level: level, msg: msg, data: data });
      }
    } catch (_) {}
  }

  log('info', 'v' + STATE.version + ' started');

  var DICT = {
    exact: {
  ".emdash.json -- commit to share with team": ".emdash.json -- 提交以与团队共享",
  "A pull request is already open": "已有打开的拉取请求",
  AM: "上午",
  API: "API",
  "API Key": "API 密钥",
  About: "关于",
  Accessed: "访问时间",
  Account: "账户",
  Accounts: "账户",
  Actions: "操作",
  Active: "活跃",
  "Active Tasks": "活跃任务",
  "Active terminal sessions and running agents will stop when the app quits.": "退出应用后，活跃终端会话和运行中的 Agent 将停止。",
  Actually: "取消",
  Add: "添加",
  "Add Connection": "添加连接",
  "Add GitHub account": "添加 GitHub 账户",
  "Add MCP Server": "添加 MCP 服务器",
  "Add Project": "添加项目",
  "Add Provider": "添加提供商",
  "Add Remote": "添加远程",
  "Add Task": "添加任务",
  "Add a GitHub account": "添加 GitHub 账户",
  "Add a connection to create and manage remote projects.": "添加连接以创建和管理远程项目。",
  "Add a new local or SSH project": "添加本地或 SSH 项目",
  "Add a prompt to the automation...": "为自动化添加提示词...",
  "Add a prompt to the initial message": "将提示词添加到初始消息",
  "Add an optional initial message...": "添加可选的初始消息...",
  "Add another GitHub account to your Emdash account": "添加另一个 GitHub 账户",
  "Add at least one action before saving": "保存前至少添加一个操作",
  "Add comment": "添加评论",
  "Add context": "添加上下文",
  "Add issue context to the initial message": "将议题上下文添加到初始消息",
  "Add remote project": "添加远程项目",
  "Add test coverage": "添加测试覆盖",
  "Add the selected issue to the initial agent prompt when creating a task from an issue.": "从议题创建任务时，将所选议题添加到初始智能体提示词中。",
  "Add to input": "添加到输入",
  "Add variable": "添加变量",
  "Adding issue context...": "正在添加议题上下文...",
  "Adding...": "添加中...",
  "Additional parameters": "额外参数",
  Address: "地址",
  Admin: "管理员",
  "Advanced settings": "高级设置",
  Agent: "智能体",
  "Agent Settings": "智能体设置",
  "Agent completed": "Agent 完成",
  "Agent error": "Agent 错误",
  "Agent is awaiting input": "智能体等待输入",
  "Agent is working": "智能体正在工作",
  Agents: "智能体",
  All: "全部",
  "All agents": "全部智能体",
  "All changes committed": "所有更改已提交",
  "All files": "所有文件",
  "All types": "所有类型",
  Allow: "允许",
  Always: "始终",
  "An error occurred": "发生错误",
  "An unexpected error occurred": "发生了意外错误",
  "An update is available": "有可用更新",
  "Analyze recent commits for high-severity correctness bugs and submit safe fixes": "分析最近的提交以查找高严重性的正确性 Bug，并提交安全修复",
  App: "应用",
  "App Settings": "应用设置",
  Appearance: "外观",
  "Appearance & Theme": "外观与主题",
  "Append random branch suffix": "追加随机分支后缀",
  Apply: "应用",
  April: "四月",
  Archive: "归档",
  Archived: "已归档",
  "Are you sure you want to discard all changes? This can not be undone.": "确定要放弃所有更改吗？此操作不可撤销。",
  "Are you sure you want to discard the changes to the selected files? This can not be undone.": "确定要放弃所选文件的更改吗？此操作不可撤销。",
  "Are you sure?": "确定吗？",
  ArrowDown: "下箭头",
  ArrowUp: "上箭头",
  "Ask for confirmation before closing a tab.": "关闭标签页前要求确认。",
  "Assign a project before running": "运行前指定项目",
  Assignee: "指派人",
  August: "八月",
  Authenticating: "认证中",
  "Authentication failed": "认证失败",
  Author: "作者",
  Authorize: "授权",
  Authorizing: "授权中",
  Auto: "自动",
  "Auto Save": "自动保存",
  "Auto approve": "自动批准",
  "Auto-approve": "自动批准",
  "Auto-approve permissions": "自动批准权限",
  "Auto-copy selected text": "自动复制选中文本",
  "Auto-generate task names": "自动生成任务名称",
  "Auto-push on create": "创建时自动推送",
  "Auto-run on task creation": "创建任务时自动运行",
  "Auto-trust worktree directories": "自动信任工作树目录",
  "Auto-update": "自动更新",
  "Auto-update .gitignore": "自动更新 .gitignore",
  "Automatic updates are not available for this installation.": "此安装不支持自动更新。",
  "Automatically copy text to clipboard when you select it in the terminal.": "在终端中选中文本时自动复制到剪贴板。",
  "Automatically suggests a task name when creating a new task.": "创建新任务时自动建议任务名称。",
  "Automation created": "自动化已创建",
  "Automation details": "自动化详情",
  Automations: "自动化",
  Available: "可用",
  "Awaiting input": "等待输入",
  Away: "离开",
  Back: "返回",
  Backspace: "退格",
  "Base Branch": "基础分支",
  "Base Profile": "基础配置文件",
  "Base remote": "基础远程",
  "Based on": "基于",
  Billing: "计费",
  "Binary file": "二进制文件",
  "Binary file -- no diff available": "二进制文件 -- 没有可显示的差异",
  Block: "阻止",
  Bottom: "底部",
  Branch: "分支",
  "Branch Settings": "分支设置",
  "Branch \\\"{branch}\\\" has no commits yet": "分支 \\\"{branch}\\\" 尚无提交",
  "Branch \\\"{branch}\\\" was not found": "未找到分支 \\\"{branch}\\\"",
  "Branch is out-of-date": "分支已过期",
  "Branch name copied": "分支名称已复制",
  "Branch prefix": "分支前缀",
  Browse: "浏览",
  "Browse files...": "浏览文件...",
  Browser: "浏览器",
  "Browser Back": "浏览器后退",
  "Browser Forward": "浏览器前进",
  "Browser URL copied": "浏览器地址已复制",
  Build: "构建",
  Busy: "忙碌",
  "Bypass rules and merge": "绕过规则并合并",
  CLI: "CLI",
  "CLI Override": "CLI 覆盖",
  "CLI that connects to OpenAI models for project-aware code assistance and terminal workflows.": "连接 OpenAI 模型的 CLI，提供项目感知的代码辅助和终端工作流。",
  "CLI that uses Anthropic Claude for code edits, explanations, and structured refactors in the terminal.": "使用 Anthropic Claude 在终端中进行代码编辑、解释和结构化重构的 CLI。",
  "CLI that uses Google Gemini models to assist with coding, reasoning, and command-line tasks.": "使用 Google Gemini 模型辅助编码、推理和命令行任务的 CLI。",
  Cache: "缓存",
  Cancel: "取消",
  "Cancel (Esc)": "取消 (Esc)",
  "Cancel comment": "取消评论",
  "Cannot add project": "无法添加项目",
  "Cannot delete SSH connection": "无法删除 SSH 连接",
  "Cannot publish: HEAD is detached": "无法发布: HEAD 处于分离状态",
  Center: "居中",
  "Change SSH Connection": "更改 SSH 连接",
  "Change custom sound": "更换自定义声音",
  "Change source": "更改来源",
  "Change where worktrees are created.": "更改工作树的创建位置。",
  Changed: "已更改",
  Changelog: "更新日志",
  Changes: "更改",
  "Changes discarded": "更改已放弃",
  "Changes saved": "更改已保存",
  Check: "检查",
  "Check for Updates": "检查更新",
  "Check for Updates…": "检查更新…",
  "Check out": "检出",
  "Checked for updates": "已检查更新",
  "Checking for updates...": "正在检查更新...",
  "Checking...": "正在检查...",
  "Checking…": "检查中…",
  "Checkout branch": "检出分支",
  Checks: "检查",
  "Checks not passing": "检查未通过",
  "Checks passing, but PR is unstable": "检查通过，但 PR 不稳定",
  "Checks pending or not passing": "检查等待或未通过",
  "Checks still running": "检查仍在运行",
  Choose: "选择",
  "Choose a file...": "选择文件...",
  "Choose a positive deadline duration": "选择正数的截止时长",
  "Choose a template and adjust it before creating your first automation": "选择模板并在创建第一个自动化之前进行调整",
  "Choose a valid deadline policy": "选择有效的截止策略",
  "Choose custom sound": "选择自定义声音",
  "Choose file...": "选择文件...",
  "Choose file…": "选择文件…",
  Clear: "清除",
  "Clear Cache": "清除缓存",
  "Clear Chat": "清空对话",
  "Clear all": "全部清除",
  "Clear browser storage?": "清除浏览器存储？",
  "Clear selection": "清除选择",
  Click: "点击",
  Client: "客户端",
  "Clone a GitHub repository to work on locally": "克隆 GitHub 仓库到本地",
  "Clone from GitHub": "从 GitHub 克隆",
  "Cloning...": "正在克隆...",
  Close: "关闭",
  "Close Modal": "关闭模态框",
  "Close Tab": "关闭标签",
  "Close all tabs": "关闭所有标签页",
  "Close other tabs": "关闭其他标签页",
  "Close tab": "关闭标签页",
  "Close tab?": "关闭标签？",
  "Close tabs to the right": "关闭右侧标签页",
  "Close the active tab": "关闭当前标签",
  "Close the current modal or dialog": "关闭当前模态框或对话框",
  Closed: "已关闭",
  Cloud: "云端",
  "Code of Conduct": "行为准则",
  "Code quality": "代码质量",
  Collapse: "折叠",
  "Collapse All": "全部折叠",
  Collapsed: "已折叠",
  "Color Theme": "颜色主题",
  "Color mode": "颜色模式",
  Comfortable: "舒适",
  "Command Palette": "命令面板",
  "Command Palette...": "命令面板...",
  "Command-line interface to Alibaba": "阿里巴巴命令行接口工具",
  "Commands used to provision and terminate BYOI infrastructure for tasks.": "用于为任务配置和终止 BYOI 基础设施的命令。",
  Commit: "提交",
  "Commit & Create PR": "提交并创建 PR",
  "Commit & Push": "提交并推送",
  "Commit Message": "提交信息",
  "Commit changes": "提交更改",
  "Commit message": "提交信息",
  Commits: "提交",
  Committed: "已提交",
  "Committing...": "正在提交...",
  Community: "社区",
  Compact: "紧凑",
  "Completed Tasks": "已完成任务",
  Configuration: "配置",
  Configure: "配置",
  "Configure issue integrations": "配置议题集成",
  "Configure the automation before running": "运行前配置自动化",
  Confirm: "确认",
  "Confirm tab close": "关闭标签页前确认",
  "Confirm the current dialog action": "确认当前对话框操作",
  Connect: "连接",
  "Connect GitHub": "连接 GitHub",
  "Connect GitHub from account settings.": "在账户设置中连接 GitHub。",
  "Connect GitHub on this device with a one-time code": "使用一次性代码在此设备上连接 GitHub",
  "Connect external services and tools.": "连接外部服务和工具。",
  "Connect to GitHub": "连接 GitHub",
  "Connect to Jira": "连接 Jira",
  "Connect to Linear": "连接 Linear",
  Connected: "已连接",
  "Connected to GitHub": "已连接到 GitHub",
  Connecting: "正在连接",
  "Connecting to": "正在连接到",
  "Connecting...": "正在连接...",
  "Connection failed. Please try again.": "连接失败，请重试。",
  "Connection issue": "连接问题",
  "Connection lost": "连接断开",
  Connections: "连接",
  "Context bar": "上下文栏",
  Conversation: "对话",
  Conversations: "对话",
  Convert: "转换",
  "Convert to Regular Task": "转换为普通任务",
  "Convert to regular task": "转换为常规任务",
  "Copied to clipboard": "已复制到剪贴板",
  Copy: "复制",
  "Copy Browser URL": "复制浏览器地址",
  "Copy Image URL": "复制图片地址",
  "Copy Installation ID": "复制安装 ID",
  "Copy Link": "复制链接",
  "Copy Response": "复制回复",
  "Copy URL": "复制 URL",
  "Copy branch name": "复制分支名称",
  "Copy failed": "复制失败",
  "Copy link": "复制链接",
  "Copy path": "复制路径",
  "Copy the active browser URL": "复制当前浏览器地址",
  "Copy the current in-app browser URL": "复制当前应用内浏览器地址",
  "Copy to clipboard": "复制到剪贴板",
  "Could not capture screenshot": "无法截屏",
  "Could not clear browser data": "无法清除浏览器数据",
  "Could not connect": "无法连接",
  "Could not copy browser URL": "无法复制浏览器地址",
  "Could not create branch \\\"{branch}\\\"": "无法创建分支 \\\"{branch}\\\"",
  "Could not fetch pull requests from \\\"{remote}\\\"": "无法从 \\\"{remote}\\\" 获取拉取请求",
  "Could not load pull requests": "无法加载拉取请求",
  "Could not set up the worktree for \\\"{branch}\\\"": "无法为 \\\"{branch}\\\" 设置工作树",
  "Could not start the agent conversation": "无法启动智能体对话",
  Create: "创建",
  "Create & Publish": "创建并发布",
  "Create Account": "创建账户",
  "Create Branch": "创建分支",
  "Create Conversation": "创建对话",
  "Create Draft PR": "创建草稿 PR",
  "Create PR": "创建 PR",
  "Create Profile": "创建配置文件",
  "Create Project": "创建项目",
  "Create Pull Request": "创建拉取请求",
  "Create Repository": "创建仓库",
  "Create Task": "创建任务",
  "Create a Task from a Branch": "从分支创建任务",
  "Create a new conversation in a split pane to the right": "在右侧分屏中创建新对话",
  "Create a new conversation in the current task": "在当前任务中创建新对话",
  "Create a new project": "创建新项目",
  "Create a new task": "创建新任务",
  "Create a new task in this project": "在此项目中创建任务",
  "Create a new terminal in the current task": "在当前任务中创建新终端",
  "Create a new terminal session": "创建新终端会话",
  "Create a project by creating a new repository on GitHub": "在 GitHub 上创建新仓库来建立项目",
  "Create a project from an existing local directory": "从现有本地目录创建项目",
  "Create a project on a remote SSH server": "在远程 SSH 服务器上创建项目",
  "Create a pull request": "创建拉取请求",
  "Create a task from a pull request": "从拉取请求创建任务",
  "Create a task from an existing branch": "从现有分支创建任务",
  "Create an initial commit first": "请先创建初始提交",
  "Create and update developer documentation for recently changed or under-documented code": "为最近更改或文档不足的代码创建和更新开发者文档",
  "Create automation": "创建自动化",
  "Create branch and worktree by default": "默认创建分支和工作树",
  "Create draft PR": "创建草稿 PR",
  "Create from Issue": "从议题创建",
  "Create from Pull Request": "从拉取请求创建",
  "Create new branch": "创建新分支",
  "Create or link a remote, then publish this branch": "创建或链接远程仓库，然后发布此分支",
  "Create or sign into your Emdash account with GitHub": "使用 GitHub 创建或登录 Emdash 账户",
  "Create repository": "创建仓库",
  Created: "创建时间",
  "Created at": "创建时间",
  "Creating repository...": "正在创建仓库...",
  "Creating repository…": "创建仓库中…",
  "Creating task": "正在创建任务",
  "Creating task workspace...": "正在创建任务工作区...",
  "Creating task...": "正在创建任务...",
  "Creating task…": "创建任务中…",
  "Creating workspace...": "正在创建工作区...",
  "Creating...": "正在创建...",
  "Current Version": "当前版本",
  Custom: "自定义",
  "Custom configuration is applied": "已应用自定义配置",
  "Custom sound": "自定义声音",
  Customize: "自定义",
  "Customize the appearance and behavior of the app.": "自定义应用的外观和行为。",
  "Daily Pull Request Review": "每日 PR 审查",
  Dark: "深色",
  Database: "数据库",
  Debug: "调试",
  December: "十二月",
  "Decrease terminal font size": "减小终端字体大小",
  Default: "默认",
  "Default (Menlo)": "默认 (Menlo)",
  "Default GitHub account updated": "默认 GitHub 账户已更新",
  "Default Model": "默认模型",
  "Default account": "默认账户",
  "Default agent": "默认智能体",
  "Default branch": "默认分支",
  "Default terminal shell": "默认终端 Shell",
  "Define what this skill does and how agents should use it": "定义此技能的功能以及智能体应如何使用它",
  Delete: "删除",
  "Delete Branch": "删除分支",
  "Delete Connection": "删除连接",
  "Delete Profile": "删除配置文件",
  "Delete SSH connection": "删除 SSH 连接",
  "Delete Selected Tasks": "删除选中任务",
  "Delete Task": "删除任务",
  "Delete automation": "删除自动化",
  "Delete comment": "删除评论",
  "Delete conversation": "删除对话",
  "Delete project": "删除项目",
  "Delete prompt?": "删除提示词？",
  "Delete task": "删除任务",
  "Delete the selected tasks": "删除选中的任务",
  "Deleting...": "删除中...",
  Density: "密度",
  Deny: "拒绝",
  Deploy: "部署",
  Deployment: "部署",
  Description: "描述",
  "Description is required.": "描述为必填项。",
  "Deselect all": "取消全选",
  Destination: "目标",
  Detach: "分离",
  "Detach this task from its automation run": "从自动化运行中分离此任务",
  "Detached HEAD": "分离的 HEAD",
  Details: "详情",
  Detected: "已检测到",
  "Detected external project config.": "检测到外部项目配置。",
  "Device flow": "设备流程",
  "Device flow was canceled": "设备流程已取消",
  Diff: "差异",
  Disable: "禁用",
  Disabled: "已禁用",
  Discard: "放弃",
  "Discard All Changes": "放弃所有更改",
  "Discard Files Changes": "放弃文件更改",
  "Discard all": "全部放弃",
  "Discard draft": "丢弃草稿",
  Disconnect: "断开连接",
  Disconnected: "已断开",
  Discord: "Discord",
  Dismiss: "忽略",
  Docs: "文档",
  Documentation: "文档",
  Done: "已完成",
  Download: "下载",
  Downloading: "正在下载",
  "Downloading update...": "正在下载更新...",
  "Draft pull request": "草稿拉取请求",
  Drag: "拖动",
  Drop: "放下",
  "Drop a folder to add it as a project.": "拖放文件夹以添加为项目。",
  "Drop files here": "拖放文件到此处",
  "Drop to add project": "拖放以添加项目",
  Duplicate: "复制",
  Edit: "编辑",
  "Edit Connection": "编辑连接",
  "Edit comment": "编辑评论",
  Editor: "编辑器",
  "Editor Preferences": "编辑器偏好",
  Email: "邮箱",
  "Emdash Account": "Emdash 账户",
  "Emdash Dark": "Emdash 深色",
  "Emdash Light": "Emdash 浅色",
  Empty: "空",
  "Empty directory": "空目录",
  Enable: "启用",
  "Enable anonymous telemetry": "启用匿名遥测",
  "Enable automation": "启用自动化",
  Enabled: "已启用",
  Enter: "确认",
  "Enter a project name": "输入项目名称",
  "Enter a repository URL": "输入仓库 URL",
  "Enter a repository name": "输入仓库名称",
  "Enter a valid schedule": "输入有效的计划",
  "Enter the command name or binary resolved on PATH. This overrides auto-resolution and disables emdash's ability to update the agent.": "输入命令名称或在 PATH 中解析的二进制文件。这将覆盖自动解析并禁用 emdash 更新该智能体的能力。",
  Error: "错误",
  Escape: "退出",
  "Example prompt": "示例提示词",
  Expand: "展开",
  "Expand All": "全部展开",
  Expanded: "已展开",
  Experimental: "实验性",
  "Experimental Features": "实验性功能",
  Export: "导出",
  "Extend your agents with reusable skill modules": "使用可复用的技能模块扩展您的智能体",
  Failed: "失败",
  "Failed to add": "添加失败",
  "Failed to check for updates": "检查更新失败",
  "Failed to check project": "检查项目失败",
  "Failed to create skill": "创建技能失败",
  "Failed to decode image": "解码图片失败",
  "Failed to delete SSH connection": "删除 SSH 连接失败",
  "Failed to import project config.": "导入项目配置失败。",
  "Failed to list directory": "列出目录失败",
  "Failed to load": "加载失败",
  "Failed to load SSH connection usage": "加载 SSH 连接使用情况失败",
  "Failed to load image": "加载图片失败",
  "Failed to mark pull request ready": "标记 PR 为就绪失败",
  "Failed to refresh MCP data": "刷新 MCP 数据失败",
  "Failed to refresh installations": "刷新安装失败",
  "Failed to refresh pull requests": "刷新拉取请求失败",
  "Failed to remove server": "移除服务器失败",
  "Failed to save server": "保存服务器失败",
  "Failed to send feedback": "发送反馈失败",
  "Failed to set up project": "设置项目失败",
  Favorite: "收藏",
  February: "二月",
  Feedback: "反馈",
  "Feedback sent": "反馈已发送",
  Fetch: "获取",
  "Fetch changes": "获取更改",
  "Fetch from remote": "从远程获取",
  "Fetch latest changes from remote": "从远程获取最新更改",
  "Fetch origin": "从远程获取",
  "Fetching...": "正在获取...",
  File: "文件",
  "File added": "文件已添加",
  "File copied": "文件已复制",
  "File deleted": "文件已删除",
  Files: "文件",
  Filter: "筛选",
  "Filter by": "筛选方式",
  "Find critical bugs": "查找关键 Bug",
  Finish: "完成",
  "Fix reported bugs": "修复上报的 Bug",
  "Focus Browser URL": "聚焦浏览器地址",
  "Focus the URL field in the active browser tab": "聚焦浏览器地址栏",
  Follow: "关注",
  Font: "字体",
  "Font Family": "字体",
  "Font Size": "字体大小",
  "Force Reload": "强制重新加载",
  "Force full sync": "强制完全同步",
  "Format on Save": "保存时格式化",
  Forward: "前进",
  Found: "已找到",
  Friday: "星期五",
  "From {name} skill library": "来自 {name} 技能库",
  Full: "全",
  "Full sync": "完全同步",
  GUI: "GUI",
  General: "通用",
  "Generate docs": "生成文档",
  "Get notified when agents need your attention.": "当智能体需要您的关注时收到通知。",
  "Get started": "开始使用",
  "Getting Started": "入门指南",
  Git: "Git",
  "Git Fetch": "Git 获取",
  "Git Pull": "Git 拉取",
  "Git Push": "Git 推送",
  "GitHub API is disabled for this project.": "此项目已禁用 GitHub API。",
  "GitHub Accounts": "GitHub 账户",
  "GitHub CLI": "GitHub CLI",
  "GitHub CLI accounts imported": "GitHub CLI 账户已导入",
  "GitHub account removed": "GitHub 账户已移除",
  "GitHub connection unsuccessful": "GitHub 连接失败",
  "GitHub is connected.": "GitHub 已连接。",
  "Give Feedback": "发送反馈",
  "Give the automation a name": "为自动化命名",
  "Global Settings": "全局设置",
  "Go Back": "后退",
  "Go Forward": "前进",
  "Go back in the active browser tab": "在浏览器标签中后退",
  "Go forward in the active browser tab": "在浏览器标签中前进",
  "Go to file": "转到文件",
  "Go to line": "转到行",
  "Got it": "知道了",
  Guest: "访客",
  "Head Branch": "源分支",
  Help: "帮助",
  "Help improve Emdash by sending anonymous usage data.": "通过发送匿名使用数据来帮助改进 Emdash。",
  Hidden: "隐藏",
  Hide: "隐藏",
  "Hide context bar": "隐藏上下文栏",
  "Hide from menu": "在菜单中隐藏",
  "Hide the conversation context actions if they obstruct your viewport.": "如果对话上下文操作遮挡了视口，则隐藏它们。",
  Hold: "长按",
  Homebrew: "Homebrew",
  Horizontal: "水平",
  Host: "主机",
  "IPC failed": "IPC 失败",
  "Identifier:": "标识符:",
  "Image URL copied": "图片 URL 已复制",
  Import: "导入",
  "Import failed": "导入失败",
  "Import into Emdash": "导入到 Emdash",
  "Import project config": "导入项目配置",
  Imported: "已导入",
  "Importing...": "导入中...",
  "In Progress": "进行中",
  Inactive: "未激活",
  "Inactive in this build (no PostHog keys)": "此版本中未启用（没有 PostHog 密钥）",
  "Incidents & triage": "事件与分类",
  "Include issue context by default": "默认包含议题上下文",
  "Increase terminal font size": "增大终端字体大小",
  "Incremental sync": "增量同步",
  "Indexing workspace...": "正在索引工作区...",
  Info: "信息",
  "Initial Conversation": "初始对话",
  "Initialize git repository": "初始化 git 仓库",
  Inline: "行内",
  Input: "输入",
  Install: "安装",
  "Install Agent": "安装智能体",
  "Install failed": "安装失败",
  "Install this tool to show it in menu": "安装此工具以在菜单中显示",
  Installation: "安装",
  "Installation options": "安装选项",
  "Installations refreshed": "安装已刷新",
  Installed: "已安装",
  "Installing update. Emdash will close and restart automatically -- this may take a few seconds.": "正在安装更新。Emdash 将自动关闭并重启 -- 可能需要几秒钟。",
  "Installing...": "正在安装...",
  Instructions: "说明",
  Integration: "集成",
  "Integration connected": "集成已连接",
  "Integration set up successfully.": "集成设置成功。",
  Integrations: "集成",
  Interface: "界面",
  "Investigate bug reports you provide in issues, docs, or prompt notes and fix with a PR": "调查您在议题、文档或提示词笔记中提供的 Bug 报告，并通过 PR 修复",
  Issue: "议题",
  January: "一月",
  July: "七月",
  June: "六月",
  "Just now": "刚刚",
  KEY: "键",
  Keybindings: "快捷键",
  "Keyboard Shortcuts": "键盘快捷键",
  "Keyboard shortcuts": "键盘快捷键",
  Label: "标签",
  Language: "语言",
  Large: "大",
  "Last run on": "上次运行于",
  "Last used": "最近使用",
  "Launching task": "正在启动任务",
  Layout: "布局",
  "Learn more": "了解更多",
  "Leave empty to create branches without a prefix.": "留空则创建不带前缀的分支。",
  Left: "左",
  "Left Sidebar": "左侧边栏",
  "Left sidebar PR status": "左侧边栏 PR 状态",
  "Left sidebar line changes": "左侧边栏行更改",
  "Left sidebar timestamps": "左侧边栏时间戳",
  Library: "库",
  "Lifecycle Scripts": "生命周期脚本",
  "Lifecycle scripts": "生命周期脚本",
  Light: "浅色",
  Like: "点赞",
  "Line Numbers": "行号",
  "Link & Publish": "关联并发布",
  "Link Existing": "关联现有",
  "Link GitHub account": "关联 GitHub 账户",
  "Link and create a task from an issue": "从议题关联并创建任务",
  "Link copied": "链接已复制",
  "Linking...": "正在关联...",
  "Linux Installer": "Linux 安装程序",
  "Load more": "加载更多",
  "Load more results": "加载更多结果",
  "Loading GitHub accounts...": "正在加载 GitHub 账户...",
  "Loading account...": "正在加载账户...",
  "Loading comments...": "正在加载评论...",
  "Loading files...": "正在加载文件...",
  "Loading fonts...": "正在加载字体...",
  "Loading more results...": "正在加载更多结果...",
  "Loading more...": "正在加载更多...",
  "Loading skill details": "正在加载技能详情",
  "Loading workspace...": "正在加载工作区...",
  "Loading...": "加载中...",
  Local: "本地",
  Lock: "锁定",
  Logs: "日志",
  "Lowercase letters, numbers, and hyphens": "小写字母、数字和连字符",
  MCP: "MCP",
  "MCP Servers": "MCP 服务器",
  "Manage Account": "管理账户",
  "Manage CLI agents and model configurations.": "管理 CLI 智能体和模型配置。",
  "Manage in Library": "在库中管理",
  "Manage reusable SSH connections for remote projects.": "管理用于远程项目的可复用 SSH 连接。",
  "Manage your account, privacy settings, notifications, and app updates.": "管理您的账户、隐私设置、通知和应用更新。",
  Manual: "手动",
  "Manually stopped": "手动停止",
  March: "三月",
  "Mark all as read": "全部标为已读",
  "Mark ready": "标记为就绪",
  "Mark ready for review to enable merging.": "标记为可审查以启用合并。",
  "Marking ready...": "正在标记为就绪...",
  Maximize: "最大化",
  May: "五月",
  Medium: "中",
  Member: "成员",
  Merge: "合并",
  "Merge changes": "合并更改",
  "Merge conflicts": "合并冲突",
  "Merge pull request": "合并拉取请求",
  "Merge status unknown": "合并状态未知",
  "Merge without waiting": "无需等待即可合并",
  "Merging is blocked": "合并被阻止",
  "Merging...": "正在合并...",
  Minimap: "小地图",
  Minimize: "最小化",
  Model: "模型",
  Models: "模型",
  Modified: "修改后",
  Monday: "星期一",
  "More information": "更多信息",
  Move: "移动",
  "Move the active tab to a new pane on the right": "将当前标签移动到右侧新窗格",
  Mute: "静音",
  Name: "名称",
  "Name must be lowercase letters, numbers, and hyphens (2-64 chars).": "名称必须为小写字母、数字和连字符（2-64 个字符）。",
  "Name this automation": "为自动化命名",
  Navigate: "导航",
  "Navigate to the next location": "导航到下一个位置",
  "Navigate to the previous location": "导航到上一个位置",
  Navigation: "导航",
  Network: "网络",
  New: "新建",
  "New Automation": "新建自动化",
  "New Conversation": "新建对话",
  "New Conversation in Right Split": "在右侧分屏新建对话",
  "New Project": "新建项目",
  "New Skill": "新建技能",
  "New Task": "新建任务",
  "New Terminal": "新建终端",
  "New branch": "新建分支",
  "New conversation": "新对话",
  "New projects will use @{login} by default.": "新项目将默认使用 @{login}。",
  "New task for": "新建任务",
  Newest: "最新",
  Next: "下一个",
  "Next Tab": "下一个标签",
  "Next Task": "下一个任务",
  "Next run scheduled": "下次运行计划在",
  No: "否",
  "No GitHub CLI session found. Run gh auth login first.": "未找到 GitHub CLI 会话。请先运行 gh auth login。",
  "No GitHub account": "没有 GitHub 账户",
  "No GitHub account is configured for this project.": "此项目未配置 GitHub 账户。",
  "No GitHub accounts are connected.": "没有已连接的 GitHub 账户。",
  "No MCP servers configured for this agent yet.": "尚未为此智能体配置 MCP 服务器。",
  "No SSH connections": "没有 SSH 连接",
  "No automations match your search.": "没有匹配搜索的自动化。",
  "No changes": "没有更改",
  "No changes -- Select or make changes to files to see diffs.": "没有更改 -- 选择或修改文件以查看差异。",
  "No changes to display": "没有可显示的更改",
  "No checks available": "没有可用的检查",
  "No checks or comments": "没有检查或评论",
  "No comments available": "没有评论",
  "No commits": "没有提交",
  "No conflicts or required reviews.": "没有冲突或必需的审查。",
  "No context found": "未找到上下文",
  "No data": "无数据",
  "No file changes": "没有文件更改",
  "No file chosen": "未选择文件",
  "No file selected": "未选择文件",
  "No fonts found.": "未找到字体。",
  "No longer connected": "不再连接",
  "No projects": "没有项目",
  "No pull requests": "没有拉取请求",
  "No remote repository connected": "未连接远程仓库",
  "No results": "无结果",
  "No results for &ldquo;{query}&rdquo;": "没有找到 \"{query}\" 的结果",
  "No runs": "没有运行记录",
  "No runs yet.": "尚无运行记录。",
  "No shortcuts assigned": "未分配快捷键",
  "No tasks": "无任务",
  "No tasks found": "未找到任务",
  None: "无",
  "Not connected": "未连接",
  "Not detected": "未检测到",
  "Not found -- install below": "未找到 -- 请在下方安装",
  "Not installed": "未安装",
  Notes: "备注",
  "Nothing staged": "未暂存",
  "Nothing staged -- Stage files above to include them in a commit.": "未暂存 -- 暂存上方文件以将其包含在提交中。",
  "Nothing to commit": "没有可提交的内容",
  "Nothing to pull": "没有可拉取的内容",
  "Nothing to pull.": "没有可拉取的内容。",
  "Nothing to push": "没有可推送的内容",
  "Nothing to push.": "没有可推送的内容。",
  "Notification settings": "通知设置",
  Notifications: "通知",
  November: "十一月",
  Now: "现在",
  OAuth: "OAuth",
  OK: "确定",
  "OS notifications": "系统通知",
  October: "十月",
  Offline: "离线",
  Oldest: "最早",
  Online: "在线",
  "Only when unfocused": "仅当未聚焦时",
  Open: "打开",
  "Open Browser": "打开浏览器",
  "Open Browser URL Externally": "在外部浏览器打开",
  "Open Command Palette": "打开命令面板",
  "Open Image": "打开图片",
  "Open Image in New Tab": "在新标签打开图片",
  "Open Library": "打开库",
  "Open Link": "打开链接",
  "Open Link in New Tab": "在新标签打开链接",
  "Open Logs Folder": "打开日志文件夹",
  "Open PR": "打开 PR",
  "Open PR on GitHub": "在 GitHub 上打开 PR",
  "Open Preferences": "打开偏好设置",
  "Open Settings": "打开设置",
  "Open a local project": "打开本地项目",
  "Open an in-app browser for this task": "为此任务打开应用内浏览器",
  "Open an in-app browser in the current task": "在当前任务中打开应用内浏览器",
  "Open application settings": "打开应用设置",
  "Open containing folder": "打开所在文件夹",
  "Open in Editor": "在编辑器中打开",
  "Open in new tab": "在新标签页中打开",
  "Open in new window": "在新窗口中打开",
  "Open in split view": "在分屏视图中打开",
  "Open in terminal": "在终端中打开",
  "Open project": "打开项目",
  "Open the Changes panel in the right sidebar": "打开右侧边栏的更改面板",
  "Open the Conversations panel in the right sidebar": "打开右侧边栏的对话面板",
  "Open the Files panel in the right sidebar": "打开右侧边栏的文件面板",
  "Open the Library": "打开库",
  "Open the active browser URL in the system browser": "在系统浏览器中打开当前页面",
  "Open the command palette to quickly search and navigate": "打开命令面板以快速搜索和导航",
  "Open the project in the default editor": "在默认编辑器中打开项目",
  "Open the right sidebar to the Changes panel": "打开右侧边栏的更改面板",
  "Open the right sidebar to the Conversations panel": "打开右侧边栏的对话面板",
  "Open the right sidebar to the Files panel": "打开右侧边栏的文件面板",
  "Open the terminal drawer": "打开终端抽屉",
  "Opening PR...": "正在打开 PR...",
  Optional: "可选",
  Origin: "源",
  Original: "原始",
  Other: "其他",
  Output: "输出",
  Overriding: "覆盖中",
  Owner: "所有者",
  PM: "下午",
  "PR title": "PR 标题",
  "Page {n}": "第 {n} 页",
  Panel: "面板",
  Password: "密码",
  Paste: "粘贴",
  "Paste it in GitHub to authorize": "粘贴到 GitHub 以授权",
  "Path Override": "路径覆盖",
  "Path copied": "路径已复制",
  Pause: "暂停",
  "Pause automation": "暂停自动化",
  Paused: "已暂停",
  "Permission denied": "权限不足",
  Personalize: "个性化",
  Phone: "电话",
  "Pin Task": "置顶任务",
  "Pin task": "固定任务",
  "Pin this task to keep it at the top": "置顶此任务",
  Pinned: "已固定",
  "Play audio cues for agent events": "为智能体事件播放音频提示",
  "Play audio cues for agent events.": "为智能体事件播放音频提示。",
  "Please copy the code manually": "请手动复制代码",
  "Please try again": "请重试",
  "Please wait": "请稍候",
  Popular: "热门",
  Port: "端口",
  "Post a daily digest summarizing notable repository changes and risks from the previous day": "发布每日摘要，总结前一天的重要仓库更改和风险",
  PowerShell: "PowerShell",
  Preferences: "偏好设置",
  "Preparing task…": "准备任务中…",
  "Preparing workspace...": "正在准备工作区...",
  "Preserve patterns": "保留模式",
  "Preserve task name capitalization": "保留任务名称大小写",
  Press: "按下",
  "Press keys to assign": "按键以分配",
  "Press keys...": "按下按键...",
  Preview: "预览",
  "Preview sound": "预览声音",
  "Preview unavailable": "预览不可用",
  "Preview unavailable -- Git LFS smudge filter not applied": "预览不可用 -- Git LFS 滤镜未应用",
  "Preview unavailable -- file is too large": "预览不可用 -- 文件太大",
  "Preview unavailable for this format": "此格式的预览不可用",
  "Preview unavailable on SSH workspaces": "SSH 工作区上预览不可用",
  Previous: "上一个",
  "Previous Tab": "上一个标签",
  "Previous Task": "上一个任务",
  "Privacy Policy": "隐私政策",
  "Privacy and Telemetry": "隐私与遥测",
  Private: "私有",
  Processing: "处理中",
  Profile: "个人资料",
  "Profile Name": "配置文件名称",
  Profiles: "配置文件",
  Project: "项目",
  "Project Directory": "项目目录",
  "Project Name": "项目名称",
  "Project could not be found or opened": "无法找到或打开项目",
  "Project not found": "未找到项目",
  "Project not found at path": "在路径中未找到项目",
  "Project repository": "项目仓库",
  "Project settings": "项目设置",
  "Project setup complete": "项目设置完成",
  "Project:": "项目:",
  Projects: "项目",
  "Projects added": "项目已添加",
  Prompt: "提示词",
  "Prompt deleted": "提示词已删除",
  "Prompt unavailable": "提示词不可用",
  Prompts: "提示词",
  "Provider:": "提供商:",
  Providers: "提供商",
  Public: "公开",
  Publish: "发布",
  "Publish branch": "发布分支",
  "Publishing...": "正在发布...",
  Pull: "拉取",
  "Pull Request": "拉取请求",
  "Pull Requests": "拉取请求",
  "Pull changes": "拉取更改",
  "Pull from remote": "从远程拉取",
  "Pull latest changes from remote": "从远程拉取最新更改",
  "Pull request sync was cancelled.": "拉取请求同步已取消。",
  "Pull requests are currently available only for configured GitHub remotes.": "拉取请求目前仅适用于已配置的 GitHub 远程仓库。",
  "Pull requests unavailable": "拉取请求不可用",
  "Pulling...": "正在拉取...",
  Push: "推送",
  "Push changes": "推送更改",
  "Push commits to remote": "推送提交到远程",
  "Push remote": "推送远程",
  "Push to remote": "推送到远程",
  "Push your branch and create a PR to start a review.": "推送分支并创建 PR 以开始审查。",
  Pushed: "已推送",
  "Pushing...": "正在推送...",
  Queued: "排队中",
  Quit: "退出",
  "Quit Emdash?": "退出 Emdash？",
  "Random branch suffix": "随机分支后缀",
  "Ready to merge": "可以合并",
  Rebase: "变基",
  "Rebase and merge": "变基并合并",
  "Rebase changes": "变基更改",
  "Recent Conversations": "最近对话",
  "Recent Tasks": "最近任务",
  "Recently Updated": "最近更新",
  Recommended: "推荐",
  Reconnecting: "重新连接中",
  Redo: "重做",
  "Redo changes": "重做更改",
  Refresh: "刷新",
  "Refresh PR status and try again.": "刷新 PR 状态并重试。",
  "Refresh agent detection": "刷新智能体检测",
  "Refresh catalog": "刷新目录",
  "Refresh pull requests": "刷新拉取请求",
  "Refreshing installations...": "正在刷新安装...",
  Regenerate: "重新生成",
  Region: "区域",
  "Registering...": "正在注册...",
  "Relative path copied": "相对路径已复制",
  "Release Notes": "发行说明",
  Reload: "重新加载",
  "Reload Browser": "重新加载浏览器",
  "Reload the active browser tab": "重新加载浏览器标签",
  "Reload window": "重新加载窗口",
  Remote: "远程",
  "Remote Directory": "远程目录",
  "Remote URL": "远程 URL",
  Remove: "移除",
  "Remove MCP server?": "移除 MCP 服务器？",
  "Remove Project": "移除项目",
  "Remove account": "移除账户",
  "Remove shortcut": "移除快捷键",
  Rename: "重命名",
  "Rename Task": "重命名任务",
  Reply: "回复",
  "Report Issue": "报告问题",
  "Report Issue…": "报告问题…",
  "Report a bug": "报告 Bug",
  Repository: "仓库",
  "Repository Name": "仓库名称",
  "Repository Settings": "仓库设置",
  "Repository URL": "仓库 URL",
  "Request a feature": "请求功能",
  Required: "必填",
  "Required reviews, checks, or branch rules...": "需要审查、检查或分支规则...",
  Reset: "重置",
  "Reset changes": "重置更改",
  "Reset to defaults": "重置为默认值",
  "Reset zoom": "重置缩放",
  Resize: "调整大小",
  "Resolve conflicts before merging.": "合并前解决冲突。",
  Resolved: "已解决",
  "Resource Monitor": "资源监控",
  "Resource monitor": "资源监视器",
  Restart: "重启",
  "Restart to Update": "重启以更新",
  Restore: "恢复",
  Result: "结果",
  Resume: "继续",
  Retry: "重试",
  "Reveal in file explorer": "在文件浏览器中显示",
  "Review in Task": "在任务中审查",
  "Review prompt": "审查提示词",
  "Review recent changes and add tests for high-risk logic that lacks adequate coverage": "审查最近的更改，并为缺乏足够覆盖的高风险逻辑添加测试",
  "Review the full repository on a schedule and alert on validated high-impact security issues": "按计划审查整个仓库，并对已验证的高影响力安全问题发出警报",
  Right: "右",
  "Right Sidebar": "右侧边栏",
  Run: "运行",
  "Run agents on a schedule across your projects": "按计划在项目中运行智能体",
  "Run now": "立即运行",
  "Run script": "运行脚本",
  "Run the agent session inside a tmux session.": "在 tmux 会话中运行智能体会话。",
  Running: "运行中",
  "Running...": "运行中...",
  Runs: "运行记录",
  SDK: "SDK",
  SSH: "SSH",
  "SSH Connections": "SSH 连接",
  "SSH Key": "SSH 密钥",
  "SSH agent": "SSH 代理",
  "SSH channel unavailable": "SSH 通道不可用",
  "SSH connection": "SSH 连接",
  "SSH key": "SSH 密钥",
  "SSH not connected": "SSH 未连接",
  "Same as base remote": "与基础远程相同",
  Saturday: "星期六",
  Save: "保存",
  "Save comment": "保存评论",
  "Save draft": "保存草稿",
  "Save settings": "保存设置",
  "Save to": "保存到",
  Saved: "已保存",
  "Saved token": "已保存的令牌",
  "Saving...": "保存中...",
  "Scan for vulnerabilities": "扫描漏洞",
  "Scanning files...": "正在扫描文件...",
  Schedule: "计划",
  "Screenshot copied to clipboard": "截图已复制到剪贴板",
  Scroll: "滚动",
  "Scroll to bottom": "滚动到底部",
  "Scroll to top": "滚动到顶部",
  Search: "搜索",
  "Search agents...": "搜索智能体...",
  "Search agents…": "搜索智能体…",
  "Search automations...": "搜索自动化...",
  "Search by title, branch, or number...": "按标题、分支或编号搜索...",
  "Search files": "搜索文件",
  "Search files, actions, agents...": "搜索文件、操作、智能体...",
  "Search labels…": "搜索标签…",
  "Search or type a command...": "搜索或输入命令...",
  "Search or type custom font": "搜索或输入自定义字体",
  "Search projects...": "搜索项目...",
  "Search skills...": "搜索技能...",
  "Search tasks, projects, actions…": "搜索任务、项目、操作…",
  "Search tasks...": "搜索任务...",
  "Search tasks…": "搜索任务…",
  "Searching Skills.SH...": "正在搜索 Skills.SH...",
  Secure: "加密",
  Security: "安全",
  Select: "选择",
  "Select a base branch": "选择基础分支",
  "Select a directory": "选择目录",
  "Select a project": "选择项目",
  "Select a project directory to open": "选择要打开的项目目录",
  "Select a provider": "选择提供商",
  "Select all": "全选",
  "Select an SSH connection to browse remote directories.": "选择 SSH 连接以浏览远程目录。",
  "Select an audio file to play for agent events": "选择为智能体事件播放的音频文件",
  "Select config": "选择配置",
  "Select or add a connection": "选择或添加连接",
  "Select source": "选择来源",
  "Selected by default when creating a new task.": "创建新任务时默认选择。",
  Send: "发送",
  "Send Feedback": "发送反馈",
  "Send anonymous usage data": "发送匿名使用数据",
  "Send feedback to the emdash team": "向 Emdash 团队发送反馈",
  September: "九月",
  Server: "服务器",
  "Session expired": "会话已过期",
  "Set as default": "设为默认",
  "Setting up project...": "正在设置项目...",
  "Setting up workspace…": "设置工作区中…",
  Settings: "设置",
  "Settings -- local to this machine": "设置 -- 仅本机",
  "Settings to import": "要导入的设置",
  "Settings to share": "要共享的设置",
  "Settings…": "设置…",
  Setup: "设置",
  "Setup script": "设置脚本",
  Share: "共享",
  "Share feedback": "分享反馈",
  "Share settings with your team": "与团队共享设置",
  "Share with team": "与团队共享",
  "Shell commands run at each stage of the worktree lifecycle": "在工作树生命周期的每个阶段运行的 Shell 命令",
  "Shell setup": "Shell 设置",
  "Shortcut conflict": "快捷键冲突",
  "Shortcut removed": "快捷键已移除",
  "Shortcut reset": "快捷键已重置",
  "Shortcut updated": "快捷键已更新",
  Show: "显示",
  "Show CPU and memory performance for running agents": "显示运行中 Agent 的 CPU 和内存性能",
  "Show in Finder": "在 Finder 中显示",
  "Show in menu": "在菜单中显示",
  "Show less": "收起",
  "Show more": "显示更多",
  "Show or hide the left sidebar": "显示或隐藏左侧边栏",
  "Show or hide the right sidebar": "显示或隐藏右侧边栏",
  "Show or hide the terminal drawer": "显示或隐藏终端抽屉",
  "Show system banners when agents need attention or finish (while Emdash is unfocused).": "当智能体需要关注或完成时显示系统横幅（Emdash 未聚焦时）。",
  "Show system notifications when agents need attention or finish (while Emdash is unfocused)": "当智能体需要关注或完成时显示系统通知（Emdash 未聚焦时）",
  "Sign In": "登录",
  "Sign Out": "退出登录",
  "Sign in again to reconnect your Emdash account.": "重新登录以重新连接您的 Emdash 账户。",
  "Sign in failed": "登录失败",
  "Sign in to Emdash": "登录 Emdash",
  "Sign in with GitHub": "使用 GitHub 登录",
  "Sign into your Emdash account": "登录您的 Emdash 账户",
  "Sign out failed": "退出登录失败",
  "Sign out of Emdash?": "退出 Emdash？",
  "Signed in": "已登录",
  "Signed in to Emdash": "已登录 Emdash",
  "Signing in...": "正在登录...",
  "Signing in…": "登录中…",
  Silence: "静默",
  "Single PR": "单个 PR",
  "Skill has been uninstalled": "技能已卸载",
  "Skill installed": "技能已安装",
  "Skill removed": "技能已移除",
  Skills: "技能",
  "Skills & MCP": "技能与 MCP",
  "Skills Directory": "技能目录",
  "Skills.SH": "Skills.SH",
  "Skip push and open a PR from the current remote state": "跳过推送，从当前远程状态打开 PR",
  "Skip the folder trust prompt in supported CLIs for new tasks.": "在支持的 CLI 中跳过新任务的文件夹信任提示。",
  Skipped: "已跳过",
  "Skipped because it waited in the queue for too long": "因在队列中等待过久而跳过",
  "Skipped because the automation is not attached to a project": "因自动化未关联项目而跳过",
  "Skipped because the automation schedule was paused": "因自动化计划已暂停而跳过",
  "Skipped because the previous run is still in progress": "因上一次运行仍在进行中而跳过",
  Small: "小",
  "Something went wrong": "出了点问题",
  Sort: "排序",
  "Sort by": "排序方式",
  "Sort projects": "项目排序",
  "Sort...": "排序...",
  Sound: "声音",
  "Sound timing": "声音时机",
  Source: "来源",
  "Split Pane": "分屏",
  "Squash and merge": "压缩并合并",
  Stage: "暂存",
  "Stage all": "全部暂存",
  Staged: "已暂存",
  "Staged changes": "已暂存的更改",
  Start: "开始",
  "Start Task": "启动任务",
  "Start shipping": "开始使用",
  "Start with a template": "从模板开始",
  "Starting agent": "正在启动智能体",
  Stash: "暂存",
  Status: "状态",
  "Status reports": "状态报告",
  Stop: "停止",
  "Stop Task": "停止任务",
  Stopped: "已停止",
  Submit: "提交",
  "Submit comment": "提交评论",
  Subscribe: "订阅",
  Subscription: "订阅",
  Success: "成功",
  "Suggested Actions": "建议操作",
  "Summarize changes daily": "每日摘要更改",
  Summary: "摘要",
  Sunday: "星期日",
  "Supports: Prompts": "支持: 提示词",
  "Supports: Prompts, Hooks, Sessions": "支持: 提示词、钩子、会话",
  Sure: "确认",
  Suspended: "已停用",
  Switch: "切换",
  "Switch Branch": "切换分支",
  "Switch Theme": "切换主题",
  "Switch between light and dark themes": "在浅色和深色主题之间切换",
  "Switch to flat list": "切换到平铺列表",
  "Switch to the next tab": "切换到下一个标签",
  "Switch to the next task": "切换到下一个任务",
  "Switch to the previous tab": "切换到上一个标签",
  "Switch to the previous task": "切换到上一个任务",
  "Switch to tree view": "切换到树视图",
  "Sync cancelled": "同步已取消",
  "Sync complete": "同步完成",
  "Sync failed": "同步失败",
  Syncing: "同步中",
  "Syncing PRs...": "正在同步 PR...",
  "Syncing PRs…": "同步 PR 中…",
  System: "系统",
  "Tab Navigation": "标签导航",
  "Tab Size": "Tab 大小",
  Tags: "标签",
  Target: "目标",
  Task: "任务",
  "Task List": "任务列表",
  "Task Settings": "任务设置",
  "Task View": "任务视图",
  "Task created": "任务已创建",
  "Task name": "任务名称",
  "Task name...": "任务名称...",
  "Task names only allow letters, numbers, and hyphens.": "任务名称仅允许字母、数字和连字符。",
  Tasks: "任务",
  "Teardown script": "清理脚本",
  Telemetry: "遥测",
  "Telemetry information": "遥测信息",
  Templates: "模板",
  Terminal: "终端",
  "Terminal Behavior": "终端行为",
  "Terminal font": "终端字体",
  "Terminal font size": "终端字体大小",
  Terminals: "终端",
  "Terms of Service": "服务条款",
  Test: "测试",
  "Thanks for your feedback!": "感谢您的反馈！",
  "The automation run could not be updated": "自动化运行无法更新",
  "The branch name could not be copied to the clipboard.": "分支名称无法复制到剪贴板。",
  "The branch new tasks are created from by default.": "默认情况下创建新任务的来源分支。",
  "The name is too long": "名称过长",
  "The run was interrupted because the app restarted": "运行因应用重启而中断",
  "The task prompt is empty -- add one before running": "任务提示词为空 -- 运行前请添加",
  Theme: "主题",
  "Theme not changed": "主题未更改",
  "Thinking...": "思考中...",
  "This SSH connection is still used by at least one project. Change those projects to another connection before deleting it.": "此 SSH 连接仍被至少一个项目使用。删除前请将这些项目切换到其他连接。",
  "This automation already has a queued or running run": "此自动化已有排队中或运行中的任务",
  "This automation has no actions yet": "此自动化尚无操作",
  "This automation no longer exists": "此自动化已不存在",
  "This automation run no longer exists": "此自动化运行已不存在",
  "This clears cookies, local storage, IndexedDB, and cache for this browser session only.": "仅清除此浏览器会话的 Cookie、本地存储、IndexedDB 和缓存。",
  "This directory is not a git repository.": "此目录不是 git 仓库。",
  "This may take a moment": "这可能需要一点时间",
  "This will uninstall \\\"{name}\\\" from all agents. This action cannot be undone.": "这将从所有智能体中卸载 \\\"{name}\\\"。此操作无法撤消。",
  "This writes the selected settings to .emdash.json": "将所选设置写入 .emdash.json",
  Thursday: "星期四",
  Title: "标题",
  Today: "今天",
  Toggle: "切换",
  "Toggle Left Sidebar": "切换左侧边栏",
  "Toggle Right Sidebar": "切换右侧边栏",
  "Toggle Sidebar": "切换侧边栏",
  "Toggle Terminal Drawer": "切换终端抽屉",
  "Toggle Theme": "切换主题",
  "Toggle full screen": "切换全屏",
  "Toggle left sidebar": "切换左侧边栏",
  Token: "令牌",
  Tomorrow: "明天",
  Top: "顶部",
  "Track CPU and memory usage for running agents. When enabled, open it from the command palette.": "跟踪运行中智能体的 CPU 和内存使用情况。启用后，可从命令面板打开。",
  Transparent: "透明",
  "Treat the Option key as the Meta key in the terminal.": "在终端中将 Option 键视为 Meta 键。",
  "Triggered by schedule": "由计划触发",
  "Triggered manually": "手动触发",
  Troubleshooting: "故障排除",
  Trust: "信任",
  "Try again, or reload the browser view manually.": "重试，或手动重新加载浏览器视图。",
  Tuesday: "星期二",
  Type: "输入",
  "Type a command...": "输入命令...",
  "URL:": "URL:",
  "Unable to load GitHub data": "无法加载 GitHub 数据",
  "Unable to load comments": "无法加载评论",
  "Unable to load files": "无法加载文件",
  "Unable to remove GitHub account": "无法移除 GitHub 账户",
  "Unable to resolve GitHub account for project: git config failed": "无法解析项目的 GitHub 账户：git 配置失败",
  "Unable to update default account": "无法更新默认账户",
  Unarchive: "取消归档",
  "Unavailable GitHub account": "不可用的 GitHub 账户",
  Undo: "撤销",
  "Undo changes": "撤消更改",
  Unfavorite: "取消收藏",
  Unfollow: "取消关注",
  Uninstall: "卸载",
  "Uninstall failed": "卸载失败",
  "Uninstall skill?": "卸载技能？",
  Uninstalled: "已卸载",
  "Uninstalling...": "正在卸载...",
  Unknown: "未知",
  "Unknown author": "未知作者",
  "Unknown error": "未知错误",
  Unlike: "取消点赞",
  Unlink: "取消关联",
  Unlock: "解锁",
  Unmute: "取消静音",
  "Unpin task": "取消固定任务",
  Unstage: "取消暂存",
  "Unstage all": "全部取消暂存",
  "Unstage all files": "取消暂存所有文件",
  "Unstage selected files": "取消暂存选中的文件",
  Unstaged: "未暂存",
  "Unstaged changes": "未暂存的更改",
  Unsubscribe: "取消订阅",
  "Up one directory": "上一级目录",
  Update: "更新",
  "Update Available": "有可用更新",
  "Update available": "有可用更新",
  "Update ready. Restart Emdash to use the new version.": "更新已就绪。重启 Emdash 以使用新版本。",
  "Update temporarily unavailable -- please try again later": "更新暂时不可用 -- 请稍后重试",
  "Update the branch...": "更新分支...",
  "Update the note...": "更新备注...",
  Updated: "更新时间",
  Updates: "更新",
  "Upload files": "上传文件",
  Uploading: "上传中",
  Usage: "使用量",
  "Usage Data": "使用数据",
  "Use Option as Meta key": "将 Option 键用作 Meta 键",
  "Use a template": "使用模板",
  "Use accounts already authenticated with GitHub CLI": "使用已通过 GitHub CLI 认证的账户",
  "Use an audio file instead of the built-in cue.": "使用音频文件代替内置提示音。",
  "Use device flow": "使用设备流程",
  "Use team settings": "使用团队设置",
  "Use team settings for": "使用团队设置",
  "Use template": "使用模板",
  "Use this directory": "使用此目录",
  Used: "使用中",
  "Used by": "被使用",
  "Used for fetching remote branches": "用于获取远程分支",
  "Used for pull requests and issues in this project.": "用于此项目中的拉取请求和议题。",
  "Used when publishing task branches and pushing commits.": "在发布任务分支和推送提交时使用。",
  Username: "用户名",
  "Using an absolute path to the agent binary overrides auto-resolution and disables emdash's ability to update the agent.": "使用智能体二进制文件的绝对路径将覆盖自动解析，并禁用 emdash 更新该智能体的能力。",
  Validate: "验证",
  Verify: "验证",
  Verifying: "验证中",
  Version: "版本",
  "Version manager": "版本管理器",
  Vertical: "垂直",
  View: "查看",
  "View Changes": "查看更改",
  "View Conversations": "查看对话",
  "View Files": "查看文件",
  "View Shortcuts": "查看快捷键",
  "View Terminals": "查看终端",
  "View Website": "访问网站",
  "View all": "查看全部",
  "View changes": "查看更改",
  "View diff": "查看差异",
  "View file": "查看文件",
  "View on GitHub": "在 GitHub 查看",
  Visibility: "可见性",
  Visible: "可见",
  "Wait for the run to finish before deleting it": "等待运行完成后再删除",
  Warning: "警告",
  Wednesday: "星期三",
  "Welcome.": "欢迎。",
  "What does this skill do?": "这个技能做什么？",
  "What's New": "更新内容",
  "When to play sounds": "何时播放声音",
  "When to play sounds.": "何时播放声音。",
  "Windows Installer": "Windows 安装程序",
  "Word Wrap": "自动换行",
  "Working tree clean": "工作树干净",
  "Working tree clean -- No uncommitted file changes.": "工作树干净 -- 没有未提交的文件更改。",
  Workspace: "工作区",
  "Workspace Settings": "工作区设置",
  "Workspace ready": "工作区已就绪",
  "Workspace setup failed": "工作区设置失败",
  "Worktree Settings": "工作树设置",
  "Worktree directory": "工作树目录",
  "Write .emdash.json": "写入 .emdash.json",
  "Write the skill instructions here. The YAML frontmatter (name and description) will be added automatically.": "在此处编写技能说明。YAML 前置元数据（名称和描述）将自动添加。",
  "Write to": "写入到",
  "Writing...": "正在写入...",
  "Wrote .emdash.json": "已写入 .emdash.json",
  Yes: "是",
  Yesterday: "昨天",
  "You will need to sign in again to reconnect your Emdash account.": "您需要重新登录以重新连接 Emdash 账户。",
  "You're up to date.": "您已是最新版本。",
  Zoom: "缩放",
  "Zoom in": "放大",
  "Zoom out": "缩小",
  "\\\"{name}\\\" is ready to go.": "\\\"{name}\\\" 已就绪。",
  "a few seconds ago": "几秒前",
  "a moment ago": "刚刚",
  apt: "apt",
  "as a project.": "作为项目。",
  "auth required": "需要认证",
  cargo: "cargo",
  curl: "curl",
  "for the full project config reference.": "查看完整的项目配置参考。",
  "installed using": "安装方式",
  "is not a git repository.": "不是 git 仓库。",
  "macOS Installer": "macOS 安装程序",
  "my-skill": "我的技能",
  "not found": "未找到",
  npm: "npm",
  pip: "pip",
  "projects added.": "个项目已添加。",
  value: "值",
  "will be deleted. The project folder and worktrees will stay on the filesystem.": "将被删除。项目文件夹和工作树将保留在文件系统中。",
  "will be permanently deleted. Run history will be preserved.": "将被永久删除。运行历史将被保留。",
  "will be permanently deleted. This action cannot be undone.": "将被永久删除。此操作无法撤消。",
  winget: "winget"
},
    regex: [
    {
      id: "time-ago-seconds",
      pattern: new RegExp("^(\\d+)\\s+seconds?\\s+ago$", "i"),
      replace: "$1 秒前"
    },
    {
      id: "time-ago-minutes",
      pattern: new RegExp("^(\\d+)\\s+minutes?\\s+ago$", "i"),
      replace: "$1 分钟前"
    },
    {
      id: "time-ago-hours",
      pattern: new RegExp("^(\\d+)\\s+hours?\\s+ago$", "i"),
      replace: "$1 小时前"
    },
    {
      id: "time-ago-days",
      pattern: new RegExp("^(\\d+)\\s+days?\\s+ago$", "i"),
      replace: "$1 天前"
    },
    {
      id: "updated-ago",
      pattern: new RegExp("^Updated\\s+(.+)\\s+ago$", "i"),
      replace: "$1前更新"
    },
    {
      id: "count-tasks",
      pattern: new RegExp("^(\\d+)\\s+tasks?$", "i"),
      replace: "$1 个任务"
    },
    {
      id: "count-files",
      pattern: new RegExp("^(\\d+)\\s+files?$", "i"),
      replace: "$1 个文件"
    },
    {
      id: "count-projects",
      pattern: new RegExp("^(\\d+)\\s+projects?$", "i"),
      replace: "$1 个项目"
    },
    {
      id: "count-agents",
      pattern: new RegExp("^(\\d+)\\s+agents?$", "i"),
      replace: "$1 个智能体"
    },
    {
      id: "count-errors",
      pattern: new RegExp("^(\\d+)\\s+errors?$", "i"),
      replace: "$1 个错误"
    },
    {
      id: "count-warnings",
      pattern: new RegExp("^(\\d+)\\s+warnings?$", "i"),
      replace: "$1 个警告"
    },
    {
      id: "count-changes",
      pattern: new RegExp("^(\\d+)\\s+changes?$", "i"),
      replace: "$1 处更改"
    },
    {
      id: "count-commits",
      pattern: new RegExp("^(\\d+)\\s+commits?$", "i"),
      replace: "$1 个提交"
    },
    {
      id: "count-branches",
      pattern: new RegExp("^(\\d+)\\s+branches?$", "i"),
      replace: "$1 个分支"
    },
    {
      id: "count-conversations",
      pattern: new RegExp("^(\\d+)\\s+conversations?$", "i"),
      replace: "$1 个对话"
    },
    {
      id: "requests-remaining",
      pattern: new RegExp("^(\\d+)\\s+requests?\\s+remaining$", "i"),
      replace: "$1 次请求剩余"
    },
    {
      id: "version-string",
      pattern: new RegExp("^Version\\s+(.+)$", "i"),
      replace: "版本 $1"
    },
    {
      id: "no-results-for",
      pattern: new RegExp("^No results for (.+)$", "i"),
      replace: "未找到 \"$1\" 的结果"
    },
    {
      id: "syncing-prs",
      pattern: new RegExp("^Syncing PRs:\\s*(\\d+)\\s*/\\s*(\\d+)$", "i"),
      replace: "同步 PR 中: $1 / $2"
    },
    {
      id: "active-count",
      pattern: new RegExp("^Active\\s*\\((\\d+)\\)$", "i"),
      replace: "活跃 ($1)"
    },
    {
      id: "archived-count",
      pattern: new RegExp("^Archived\\s*\\((\\d+)\\)$", "i"),
      replace: "已归档 ($1)"
    },
    {
      id: "n-selected",
      pattern: new RegExp("^(\\d+)\\s+selected$", "i"),
      replace: "已选中 $1 项"
    },
    {
      id: "n-items",
      pattern: new RegExp("^(\\d+)\\s+items?$", "i"),
      replace: "$1 项"
    },
    {
      id: "count-results",
      pattern: new RegExp("^(\\d+)\\s+results?$", "i"),
      replace: "$1 个结果"
    },
    {
      id: "count-minutes",
      pattern: new RegExp("^(\\d+)\\s+min(ute)?s?$", "i"),
      replace: "$1 分钟"
    },
    {
      id: "count-hours",
      pattern: new RegExp("^(\\d+)\\s+hours?$", "i"),
      replace: "$1 小时"
    },
    {
      id: "count-days",
      pattern: new RegExp("^(\\d+)\\s+days?$", "i"),
      replace: "$1 天"
    },
    {
      id: "deleted-permanently",
      pattern: new RegExp("^\"(.+)\" will be permanently deleted\\.", "i"),
      replace: "\"$1\" 将被永久删除。"
    },
    {
      id: "delete-n-tasks",
      pattern: new RegExp("^(\\d+) tasks? will be permanently deleted\\.", "i"),
      replace: "$1 个任务将被永久删除。"
    },
    {
      id: "n-files-selected",
      pattern: new RegExp("^(\\d+) file\\(s\\) selected$", "i"),
      replace: "已选中 $1 个文件"
    },
    {
      id: "n-lines-added-removed",
      pattern: new RegExp("^(\\d+) lines? added, (\\d+) lines? removed$", "i"),
      replace: "$1 行添加，$2 行删除"
    },
    {
      id: "n-comments-in-n-files",
      pattern: new RegExp("^(\\d+) comments?\\(s\\) in (\\d+) files?\\(s\\)$", "i"),
      replace: "$1 条评论，$2 个文件"
    },
    {
      id: "n-comment-in-n-files",
      pattern: new RegExp("^(\\d+) comment\\(s\\) in (\\d+) file\\(s\\)$", "i"),
      replace: "$1 条评论，$2 个文件"
    }
  ]
  };

  var BLACKLIST_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA',
    'CODE', 'PRE', 'KBD', 'SAMP', 'VAR',
    'CANVAS', 'SVG', 'IFRAME', 'WEBVIEW'
  ]);

  function shouldSkip(node) {
    var el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return true;

    while (el && el !== document.body) {
      if (BLACKLIST_TAGS.has(el.tagName)) return true;
      if (el.getAttribute('contenteditable') === 'true') return true;
      if (el.hasAttribute('data-no-translate')) return true;
      if (el.classList && el.classList.contains('xterm')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function shouldSkipText(text) {
    var trimmed = text.trim();
    if (!trimmed) return true;
    if (trimmed.length > 200) return true;

    if (/^[\s\d.,;:!?@#$%^&*()\-+=<>\/\\|~`'"\[\]{}_]+$/.test(trimmed))
      return true;

    var cnCount = (trimmed.match(/[一-鿿]/g) || []).length;
    if (cnCount / trimmed.length > 0.3) return true;

    return false;
  }

  function translateTextNode(textNode) {
    var original = textNode.textContent;
    var trimmed = original.trim();
    if (!trimmed) return;

    if (DICT.exact.hasOwnProperty(trimmed)) {
      textNode.textContent = original.replace(trimmed, DICT.exact[trimmed]);
      STATE.totalTranslations++;
      return;
    }

    var entry = exactLower[trimmed.toLowerCase()];
    if (entry) {
      textNode.textContent = original.replace(trimmed, entry);
      STATE.totalTranslations++;
      return;
    }

    var cached = regexCache[trimmed];
    if (cached !== undefined) {
      if (cached !== null) {
        textNode.textContent = original.replace(trimmed, cached);
        STATE.totalTranslations++;
      }
      return;
    }

    for (var i = 0; i < DICT.regex.length; i++) {
      var re = DICT.regex[i];
      if (re.pattern.test(trimmed)) {
        var result = original.replace(re.pattern, re.replace);
        textNode.textContent = result;
        regexCache[trimmed] = re.replace;
        STATE.totalTranslations++;
        return;
      }
    }

    regexCache[trimmed] = null;
    STATE.untranslated[trimmed] = (STATE.untranslated[trimmed] || 0) + 1;
  }

  var taskQueue = [];
  var timerScheduled = false;

  function scheduleFlush() {
    if (timerScheduled) return;
    timerScheduled = true;
    setTimeout(flush, 50);
  }

  function flush() {
    timerScheduled = false;
    if (taskQueue.length === 0) return;

    var nodes = taskQueue;
    taskQueue = [];

    for (var i = 0; i < nodes.length; i++) {
      walkAndTranslate(nodes[i]);
    }
  }

  function walkAndTranslate(root) {
    var started = performance.now();
    try {
      var walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
            if (shouldSkipText(node.textContent)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      var textNode;
      while ((textNode = walker.nextNode())) {
        try {
          translateTextNode(textNode);
        } catch (_) {}
      }
    } catch (_) {
      STATE.errors++;
    }

    var elapsed = performance.now() - started;
    if (elapsed > 10) {
      STATE.slowOps++;
      log('warn', 'SLOW walkAndTranslate: ' + elapsed.toFixed(1) + 'ms');
    }
    STATE.lastScanMs = elapsed;
    if (elapsed > STATE.peakScanMs) STATE.peakScanMs = elapsed;
  }

  function addTask(node) {
    taskQueue.push(node);
    scheduleFlush();
  }

  function translateAttributes(el) {
    var attrs = ['title', 'aria-label', 'placeholder', 'alt'];
    for (var i = 0; i < attrs.length; i++) {
      try {
        var val = el.getAttribute(attrs[i]);
        if (!val || !val.trim()) continue;
        var trimmed = val.trim();
        if (shouldSkipText(trimmed)) continue;

        if (DICT.exact.hasOwnProperty(trimmed)) {
          el.setAttribute(attrs[i], DICT.exact[trimmed]);
          continue;
        }

        var lower = trimmed.toLowerCase();
        if (exactLower[lower]) {
          el.setAttribute(attrs[i], exactLower[lower]);
          continue;
        }

        var cached = regexCache[trimmed];
        if (cached !== undefined) {
          if (cached !== null) el.setAttribute(attrs[i], cached);
          continue;
        }

        for (var j = 0; j < DICT.regex.length; j++) {
          if (DICT.regex[j].pattern.test(trimmed)) {
            var result = trimmed.replace(DICT.regex[j].pattern, DICT.regex[j].replace);
            el.setAttribute(attrs[i], result);
            regexCache[trimmed] = result;
            break;
          }
        }
        if (regexCache[trimmed] === undefined) regexCache[trimmed] = null;
      } catch (_) {}
    }
  }

  function setupObserver() {
    var observer = new MutationObserver(function (mutations) {
      STATE.totalMutations += mutations.length;

      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];

        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var node = m.addedNodes[j];
            if (node.nodeType === Node.ELEMENT_NODE) {
              translateAttributes(node);
            }
            addTask(node);
          }
        } else if (m.type === 'attributes') {
          if (m.target.nodeType === Node.ELEMENT_NODE) {
            translateAttributes(m.target);
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['title', 'aria-label', 'placeholder', 'alt']
    });
  }

  function fullScan() {
    if (!document.body) return;
    STATE.totalScans++;
    var started = performance.now();

    walkAndTranslate(document.body);

    try {
      var all = document.querySelectorAll('[title], [aria-label], [placeholder], [alt]');
      for (var i = 0; i < all.length; i++) {
        translateAttributes(all[i]);
      }
    } catch (_) {}

    var elapsed = performance.now() - started;
    log('info', 'scan #' + STATE.totalScans + ': ' + elapsed.toFixed(1) + 'ms, TL=' + STATE.totalTranslations + ', MUT=' + STATE.totalMutations);
  }

  function dumpUntranslated() {
    var entries = [];
    for (var k in STATE.untranslated) {
      if (STATE.untranslated.hasOwnProperty(k)) {
        entries.push({ text: k, count: STATE.untranslated[k] });
      }
    }
    entries.sort(function (a, b) { return b.count - a.count; });
    try {
      if (window.electronAPI && window.electronAPI.invoke) {
        window.electronAPI.invoke('emdash-zh:save-untranslated', entries);
      }
    } catch (_) {}
    log('info', 'untranslated dump: ' + entries.length + ' unique strings');
  }

  function init() {
    try {

      try {
        if (window.electronAPI && window.electronAPI.invoke) {
          window.electronAPI.invoke('emdash-zh:clear-log');
        }
      } catch (_) {}

      setupObserver();

      setTimeout(function () { try { fullScan(); } catch (e) { log('error', 'scan #1 failed: ' + e.message); } }, 500);

      var scanCount = 0;
      var timer = setInterval(function () {
        scanCount++;
        try { fullScan(); } catch (e) { log('error', 'scan failed: ' + e.message); }
        if (scanCount >= 10) {
          clearInterval(timer);
          setTimeout(dumpUntranslated, 5000);
        }
      }, 3000);
    } catch (e) {
      log('error', 'init failed: ' + e.message);
    }
  }

  window.addEventListener('error', function (e) {
    if (e.filename && e.filename.indexOf('emdash-zh') > -1) {
      STATE.errors++;
      log('error', 'uncaught: ' + e.message + ' @ ' + e.lineno);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();