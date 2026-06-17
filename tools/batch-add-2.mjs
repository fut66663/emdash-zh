/**
 * batch-add-2.mjs — Second wave: home, settings, agents, automations, notifications, skills
 * Usage: node tools/batch-add-2.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DICT_PATH = join(ROOT, 'src', 'dict', 'zh-CN.json');
const dict = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const existing = new Set(Object.keys(dict.exact));

const translations = {
  // =========== Home / Welcome ===========
  'Open project': '打开项目',
  'Create a project from an existing local directory': '从现有本地目录创建项目',
  'Create repository': '创建仓库',
  'Create a project by creating a new repository on GitHub': '在 GitHub 上创建新仓库来建立项目',
  'Clone from GitHub': '从 GitHub 克隆',
  'Clone a GitHub repository to work on locally': '克隆 GitHub 仓库到本地',
  'Add remote project': '添加远程项目',
  'Create a project on a remote SSH server': '在远程 SSH 服务器上创建项目',
  'Welcome.': '欢迎。',
  'Start shipping': '开始交付',

  // =========== Quit/Quit Dialog ===========
  'Quit Emdash?': '退出 Emdash？',
  'Active terminal sessions and running agents will stop when the app quits.': '退出应用时，活动的终端会话和正在运行的智能体将停止。',
  'Browser URL copied': '浏览器 URL 已复制',
  'Image URL copied': '图片 URL 已复制',
  'Link copied': '链接已复制',

  // =========== Account/Sign In ===========
  'Create Account': '创建账户',
  'Create or sign into your Emdash account with GitHub': '使用 GitHub 创建或登录 Emdash 账户',
  'Sign In': '登录',
  'Sign in to Emdash': '登录 Emdash',
  'Sign in again to reconnect your Emdash account.': '重新登录以重新连接您的 Emdash 账户。',
  'Sign in with GitHub': '使用 GitHub 登录',
  'Sign in failed': '登录失败',
  'Signed in': '已登录',
  'Signed in to Emdash': '已登录 Emdash',
  'Signing in...': '正在登录...',
  'Sign Out': '退出登录',
  'Sign out failed': '退出登录失败',
  'Sign out of Emdash?': '退出 Emdash 账户？',
  'Session expired': '会话已过期',
  'You will need to sign in again to reconnect your Emdash account.': '您需要重新登录以重新连接 Emdash 账户。',
  'Loading account...': '正在加载账户...',

  // =========== Settings - General Descriptions ===========
  'Manage your account, privacy settings, notifications, and app updates.': '管理您的账户、隐私设置、通知和应用更新。',
  'Customize the appearance and behavior of the app.': '自定义应用的外观和行为。',
  'Manage CLI agents and model configurations.': '管理 CLI 智能体和模型配置。',
  'Manage reusable SSH connections for remote projects.': '管理用于远程项目的可复用 SSH 连接。',
  'Help improve Emdash by sending anonymous usage data.': '通过发送匿名使用数据来帮助改进 Emdash。',

  // =========== GitHub Connection ===========
  'Connect GitHub': '连接 GitHub',
  'Connect GitHub on this device with a one-time code': '使用一次性代码在此设备上连接 GitHub',
  'Connected': '已连接',
  'Connected to GitHub': '已连接到 GitHub',
  'Connecting...': '正在连接...',
  'Connection failed. Please try again.': '连接失败，请重试。',
  'Connection issue': '连接问题',
  'Disconnect': '断开连接',
  'GitHub is connected.': 'GitHub 已连接。',
  'Link GitHub account': '关联 GitHub 账户',
  'Linking...': '正在关联...',
  'Not connected': '未连接',
  'Reconnecting': '重新连接中',
  'GitHub account removed': 'GitHub 账户已移除',
  'GitHub CLI accounts imported': 'GitHub CLI 账户已导入',
  'No GitHub accounts are connected.': '没有已连接的 GitHub 账户。',
  'No GitHub CLI session found. Run gh auth login first.': '未找到 GitHub CLI 会话。请先运行 gh auth login。',
  'Unable to remove GitHub account': '无法移除 GitHub 账户',
  'Unable to update default account': '无法更新默认账户',
  'Use accounts already authenticated with GitHub CLI': '使用已通过 GitHub CLI 认证的账户',
  'Use device flow': '使用设备流程',
  'Add GitHub account': '添加 GitHub 账户',
  'Default account': '默认账户',
  'Set as default': '设为默认',
  'New projects will use @{login} by default.': '新项目将默认使用 @{login}。',
  'Loading GitHub accounts...': '正在加载 GitHub 账户...',

  // =========== Settings - Appearance ===========
  'Color mode': '颜色模式',
  'Emdash Dark': 'Emdash 深色',
  'Emdash Light': 'Emdash 浅色',
  'Interface': '界面',
  'Left sidebar line changes': '左侧边栏行更改',
  'Left sidebar PR status': '左侧边栏 PR 状态',
  'Left sidebar timestamps': '左侧边栏时间戳',
  'Context bar': '上下文栏',
  'Hide the conversation context actions if they obstruct your viewport.': '如果对话上下文操作遮挡了视口，则隐藏它们。',
  'Show in menu': '在菜单中显示',
  'Hide from menu': '在菜单中隐藏',
  'Resource monitor': '资源监视器',
  'Track CPU and memory usage for running agents. When enabled, open it from the command palette.': '跟踪运行中智能体的 CPU 和内存使用情况。启用后，可从命令面板打开。',

  // =========== Settings - Terminal ===========
  'Default terminal shell': '默认终端 Shell',
  'Terminal font': '终端字体',
  'Terminal font size': '终端字体大小',
  'Decrease terminal font size': '减小终端字体大小',
  'Increase terminal font size': '增大终端字体大小',
  'Default (Menlo)': '默认 (Menlo)',
  'Auto-copy selected text': '自动复制选中文本',
  'Automatically copy text to clipboard when you select it in the terminal.': '在终端中选中文本时自动复制到剪贴板。',
  'Use Option as Meta key': '将 Option 键用作 Meta 键',
  'Treat the Option key as the Meta key in the terminal.': '在终端中将 Option 键视为 Meta 键。',

  // =========== Settings - Editor ===========
  'Confirm tab close': '关闭标签页前确认',
  'Ask for confirmation before closing a tab.': '关闭标签页前要求确认。',

  // =========== Settings - Task/Project ===========
  'Auto-generate task names': '自动生成任务名称',
  'Automatically suggests a task name when creating a new task.': '创建新任务时自动建议任务名称。',
  'Auto-trust worktree directories': '自动信任工作树目录',
  'Skip the folder trust prompt in supported CLIs for new tasks.': '在支持的 CLI 中跳过新任务的文件夹信任提示。',
  'Create branch and worktree by default': '默认创建分支和工作树',
  'Preserve task name capitalization': '保留任务名称大小写',
  'Include issue context by default': '默认包含议题上下文',
  'Append random branch suffix': '追加随机分支后缀',
  'Random branch suffix': '随机分支后缀',
  'Branch prefix': '分支前缀',
  'Leave empty to create branches without a prefix.': '留空则创建不带前缀的分支。',
  'Auto-push on create': '创建时自动推送',
  'Auto-update .gitignore': '自动更新 .gitignore',

  // =========== Settings - Updates ===========
  'An update is available': '有可用更新',
  'Update available': '有更新可用',
  'Update ready. Restart Emdash to use the new version.': '更新已就绪。重启 Emdash 以使用新版本。',
  'Update temporarily unavailable -- please try again later': '更新暂时不可用 -- 请稍后重试',
  'Download': '下载',
  'Downloading': '正在下载',
  'Downloading update...': '正在下载更新...',
  'Installing update. Emdash will close and restart automatically -- this may take a few seconds.': '正在安装更新。Emdash 将自动关闭并重启 -- 可能需要几秒钟。',
  'Restart': '重启',
  'You\'re up to date.': '您已是最新版本。',
  'Automatic updates are not available for this installation.': '此安装不支持自动更新。',
  'Checking for updates...': '正在检查更新...',
  'Checked for updates': '已检查更新',
  'Failed to check for updates': '检查更新失败',

  // =========== Settings - SSH ===========
  'Connections': '连接',
  'Cannot delete SSH connection': '无法删除 SSH 连接',
  'Failed to delete SSH connection': '删除 SSH 连接失败',
  'Failed to load SSH connection usage': '加载 SSH 连接使用情况失败',
  'No SSH connections': '没有 SSH 连接',
  'SSH connection': 'SSH 连接',
  'SSH agent': 'SSH 代理',
  'SSH key': 'SSH 密钥',
  'Password': '密码',
  'Connect': '连接',
  'Used': '已使用',
  'Used by': '被使用',
  'Not detected': '未检测到',
  'Detected': '已检测到',

  // =========== Settings - Integrations ===========
  'Connect external services and tools.': '连接外部服务和工具。',
  'Integration': '集成',

  // =========== Settings - Privacy / Telemetry ===========
  'Privacy and Telemetry': '隐私与遥测',
  'Enable anonymous telemetry': '启用匿名遥测',
  'Telemetry information': '遥测信息',
  'Inactive in this build (no PostHog keys)': '此版本中未启用（没有 PostHog 密钥）',

  // =========== Settings - Fonts ===========
  'Loading fonts...': '正在加载字体...',
  'No fonts found.': '未找到字体。',
  'Search or type custom font': '搜索或输入自定义字体',

  // =========== Settings - Notifications ===========
  'Notifications': '通知',
  'Get notified when agents need your attention.': '当智能体需要您的关注时收到通知。',
  'Sound': '声音',
  'Play audio cues for agent events.': '为智能体事件播放音频提示。',
  'Custom sound': '自定义声音',
  'Use an audio file instead of the built-in cue.': '使用音频文件代替内置提示音。',
  'Sound timing': '声音时机',
  'When to play sounds.': '何时播放声音。',
  'Always': '始终',
  'Only when unfocused': '仅当未聚焦时',
  'OS notifications': '系统通知',
  'Show system banners when agents need attention or finish (while Emdash is unfocused).': '当智能体需要关注或完成时显示系统横幅（Emdash 未聚焦时）。',
  'Choose custom sound': '选择自定义声音',
  'Select an audio file to play for agent events': '选择为智能体事件播放的音频文件',
  'Preview sound': '预览声音',
  'Preview': '预览',
  'Choose file...': '选择文件...',
  'Change custom sound': '更换自定义声音',
  'Notification settings': '通知设置',
  'Play audio cues for agent events': '为智能体事件播放音频提示',
  'When to play sounds': '何时播放声音',
  'Show system notifications when agents need attention or finish (while Emdash is unfocused)': '当智能体需要关注或完成时显示系统通知（Emdash 未聚焦时）',

  // =========== Settings - Keyboard ===========
  'Keyboard shortcuts': '键盘快捷键',
  'Press keys...': '按下按键...',
  'Remove shortcut': '移除快捷键',
  'Shortcut conflict': '快捷键冲突',
  'Shortcut removed': '快捷键已移除',
  'Shortcut reset': '快捷键已重置',
  'Shortcut updated': '快捷键已更新',
  'Reset to defaults': '重置为默认值',

  // =========== Settings - General ===========
  'Accounts': '账户',
  'Projects': '项目',
  'No projects': '没有项目',
  'Manage in Library': '在库中管理',

  // =========== Agents Settings ===========
  'All agents': '全部智能体',
  'Search agents...': '搜索智能体...',
  'Refresh agent detection': '刷新智能体检测',
  'Install Agent': '安装智能体',
  'Installing...': '正在安装...',
  'Uninstalling...': '正在卸载...',
  'Install this tool to show it in menu': '安装此工具以在菜单中显示',
  'Installation': '安装',
  'Installation options': '安装选项',
  'Change source': '更改来源',
  'Select source': '选择来源',
  'View Website': '访问网站',
  'Checking...': '正在检查...',
  'Not found -- install below': '未找到 -- 请在下方安装',
  'Not installed': '未安装',
  'Found': '已找到',
  'installed using': '安装方式',
  'Custom configuration is applied': '已应用自定义配置',
  'Refreshing installations...': '正在刷新安装...',
  'Installations refreshed': '安装已刷新',
  'Failed to refresh installations': '刷新安装失败',
  'No MCP servers configured for this agent yet.': '尚未为此智能体配置 MCP 服务器。',
  'Supports: Prompts': '支持: 提示词',
  'Supports: Prompts, Hooks, Sessions': '支持: 提示词、钩子、会话',
  'More information': '更多信息',
  'KEY': '键',
  'value': '值',
  'Validate': '验证',
  'Using an absolute path to the agent binary overrides auto-resolution and disables emdash\'s ability to update the agent.': '使用智能体二进制文件的绝对路径将覆盖自动解析，并禁用 emdash 更新该智能体的能力。',
  'Enter the command name or binary resolved on PATH. This overrides auto-resolution and disables emdash\'s ability to update the agent.': '输入命令名称或在 PATH 中解析的二进制文件。这将覆盖自动解析并禁用 emdash 更新该智能体的能力。',
  'Auto': '自动',
  'Pinned': '固定',
  'Path Override': '路径覆盖',
  'CLI Override': 'CLI 覆盖',
  'Manual': '手动',
  'Version manager': '版本管理器',
  'Unknown': '未知',
  'Default agent': '默认智能体',
  'Selected by default when creating a new task.': '创建新任务时默认选择。',

  // =========== Skills ===========
  'Skills': '技能',
  'Extend your agents with reusable skill modules': '使用可复用的技能模块扩展您的智能体',
  'Search skills...': '搜索技能...',
  'Refresh catalog': '刷新目录',
  'New Skill': '新建技能',
  'Searching Skills.SH...': '正在搜索 Skills.SH...',
  'Skills.SH': 'Skills.SH',
  'From {name} skill library': '来自 {name} 技能库',
  'Example prompt': '示例提示词',
  'Open': '打开',
  'Uninstall skill?': '卸载技能？',
  'This will uninstall \\"{name}\\" from all agents. This action cannot be undone.': '这将从所有智能体中卸载 \\"{name}\\"。此操作无法撤消。',
  'Loading skill details': '正在加载技能详情',
  'Name': '名称',
  'Instructions': '说明',
  'my-skill': '我的技能',
  'What does this skill do?': '这个技能做什么？',
  'Lowercase letters, numbers, and hyphens': '小写字母、数字和连字符',
  'Write the skill instructions here. The YAML frontmatter (name and description) will be added automatically.': '在此处编写技能说明。YAML 前置元数据（名称和描述）将自动添加。',
  'Define what this skill does and how agents should use it': '定义此技能的功能以及智能体应如何使用它',
  'Name must be lowercase letters, numbers, and hyphens (2-64 chars).': '名称必须为小写字母、数字和连字符（2-64 个字符）。',
  'Description is required.': '描述为必填项。',
  'Failed to create skill': '创建技能失败',

  // =========== Automations ===========
  'Automations': '自动化',
  'Run agents on a schedule across your projects': '按计划在项目中运行智能体',
  'Search automations...': '搜索自动化...',
  'New Automation': '新建自动化',
  'No automations match your search.': '没有匹配搜索的自动化。',
  'No runs': '没有运行记录',
  'Last run on': '上次运行于',
  'Next run scheduled': '下次运行计划在',
  'Automation details': '自动化详情',
  'Name this automation': '为自动化命名',
  'Pause automation': '暂停自动化',
  'Enable automation': '启用自动化',
  'Assign a project before running': '运行前指定项目',
  'Configure the automation before running': '运行前配置自动化',
  'Run now': '立即运行',
  'Delete automation': '删除自动化',
  'will be permanently deleted. Run history will be preserved.': '将被永久删除。运行历史将被保留。',
  'Create automation': '创建自动化',
  'Name': '名称',
  'Daily Pull Request Review': '每日 PR 审查',
  'Project': '项目',
  'Schedule': '计划',
  'Prompt': '提示词',
  'Add a prompt to the automation...': '为自动化添加提示词...',
  'Use a template': '使用模板',
  'Use template': '使用模板',
  'Templates': '模板',
  'Start with a template': '从模板开始',
  'Choose a template and adjust it before creating your first automation': '选择模板并在创建第一个自动化之前进行调整',
  'Automation created': '自动化已创建',
  '\\"{name}\\" is ready to go.': '\\"{name}\\" 已就绪。',
  'Runs': '运行记录',
  'Settings': '设置',
  'Done': '已完成',
  'Failed': '失败',
  'Skipped': '已跳过',
  'No runs yet.': '尚无运行记录。',
  'Queued': '排队中',
  'Creating task': '正在创建任务',
  'Launching task': '正在启动任务',
  'Starting agent': '正在启动智能体',
  'Task created': '任务已创建',
  'Creating task...': '正在创建任务...',

  // Automation run error strings
  'Skipped because it waited in the queue for too long': '因在队列中等待过久而跳过',
  'Skipped because the automation is not attached to a project': '因自动化未关联项目而跳过',
  'Skipped because the previous run is still in progress': '因上一次运行仍在进行中而跳过',
  'Manually stopped': '手动停止',
  'Skipped because the automation schedule was paused': '因自动化计划已暂停而跳过',
  'This automation has no actions yet': '此自动化尚无操作',
  'The run was interrupted because the app restarted': '运行因应用重启而中断',
  'Project could not be found or opened': '无法找到或打开项目',
  'Could not set up the worktree for \\"{branch}\\"': '无法为 \\"{branch}\\" 设置工作树',
  'Could not create branch \\"{branch}\\"': '无法创建分支 \\"{branch}\\"',
  'Branch \\"{branch}\\" was not found': '未找到分支 \\"{branch}\\"',
  'Branch \\"{branch}\\" has no commits yet': '分支 \\"{branch}\\" 尚无提交',
  'Could not fetch pull requests from \\"{remote}\\"': '无法从 \\"{remote}\\" 获取拉取请求',
  'Workspace setup failed': '工作区设置失败',
  'Could not start the agent conversation': '无法启动智能体对话',
  'Triggered by schedule': '由计划触发',
  'Triggered manually': '手动触发',

  // Automation form validation
  'Give the automation a name': '为自动化命名',
  'The name is too long': '名称过长',
  'Add at least one action before saving': '保存前至少添加一个操作',
  'This automation no longer exists': '此自动化已不存在',
  'Wait for the run to finish before deleting it': '等待运行完成后再删除',
  'This automation already has a queued or running run': '此自动化已有排队中或运行中的任务',
  'This automation run no longer exists': '此自动化运行已不存在',
  'Enter a valid schedule': '输入有效的计划',
  'Choose a valid deadline policy': '选择有效的截止策略',
  'Choose a positive deadline duration': '选择正数的截止时长',
  'The automation run could not be updated': '自动化运行无法更新',
  'The task prompt is empty -- add one before running': '任务提示词为空 -- 运行前请添加',
  'Something went wrong': '出了点问题',

  // Automation template catalog
  'Code quality': '代码质量',
  'Status reports': '状态报告',
  'Security': '安全',
  'Incidents & triage': '事件与分类',
  'Documentation': '文档',
  'Find critical bugs': '查找关键 Bug',
  'Analyze recent commits for high-severity correctness bugs and submit safe fixes': '分析最近的提交以查找高严重性的正确性 Bug，并提交安全修复',
  'Summarize changes daily': '每日摘要更改',
  'Post a daily digest summarizing notable repository changes and risks from the previous day': '发布每日摘要，总结前一天的重要仓库更改和风险',
  'Scan for vulnerabilities': '扫描漏洞',
  'Review the full repository on a schedule and alert on validated high-impact security issues': '按计划审查整个仓库，并对已验证的高影响力安全问题发出警报',
  'Add test coverage': '添加测试覆盖',
  'Review recent changes and add tests for high-risk logic that lacks adequate coverage': '审查最近的更改，并为缺乏足够覆盖的高风险逻辑添加测试',
  'Fix reported bugs': '修复上报的 Bug',
  'Investigate bug reports you provide in issues, docs, or prompt notes and fix with a PR': '调查您在议题、文档或提示词笔记中提供的 Bug 报告，并通过 PR 修复',
  'Generate docs': '生成文档',
  'Create and update developer documentation for recently changed or under-documented code': '为最近更改或文档不足的代码创建和更新开发者文档',

  // Page numbers
  'Page {n}': '第 {n} 页',

  // =========== OS/Installer Labels ===========
  'macOS Installer': 'macOS 安装程序',
  'Windows Installer': 'Windows 安装程序',
  'Linux Installer': 'Linux 安装程序',
  'Homebrew': 'Homebrew',
  'winget': 'winget',
  'PowerShell': 'PowerShell',
  'npm': 'npm',
  'apt': 'apt',
  'curl': 'curl',
  'pip': 'pip',
  'cargo': 'cargo',
  'Other': '其他',

  // =========== More Settings ===========
  'Change custom sound': '更换自定义声音',
  'Not installed': '未安装',
  'Update available': '有可用更新',
  'Recommended': '推荐',
  'Popular': '热门',
  'Used': '使用中',
  'Remove': '移除',
  'Remove account': '移除账户',
  'Uninstall': '卸载',
  'Uninstalled': '已卸载',
  'Downloading update...': '正在下载更新...',
  'Downloading': '正在下载',
  'Download': '下载',
  'Restart': '重启',
  'Delete': '删除',
  'Delete SSH connection': '删除 SSH 连接',
};

// Add missing translations
let added = 0;
let skipped = 0;
for (const [en, zh] of Object.entries(translations)) {
  if (existing.has(en)) {
    skipped++;
  } else {
    dict.exact[en] = zh;
    existing.add(en);
    added++;
  }
}

// Sort keys
const sorted = {};
Object.keys(dict.exact).sort().forEach(k => {
  sorted[k] = dict.exact[k];
});
dict.exact = sorted;

writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2) + '\n', 'utf-8');

console.log(`Added ${added} translations, skipped ${skipped} (already in dict).`);
console.log(`Total exact entries: ${Object.keys(dict.exact).length}`);
