/**
 * batch-add-3.mjs — Third wave: common UI terms, time words, actions, statuses
 * Usage: node tools/batch-add-3.mjs
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
  // =========== Dialog / Button ===========
  'Yes': '是',
  'No': '否',
  'OK': '确定',
  'Got it': '知道了',
  'Sure': '确认',
  'Actually': '取消',
  'Apply': '应用',
  'Finish': '完成',
  'Submit': '提交',

  // =========== Common Actions ===========
  'Show': '显示',
  'Hide': '隐藏',
  'New': '新建',
  'Next': '下一个',
  'Previous': '上一个',
  'Start': '开始',
  'Pause': '暂停',
  'Move': '移动',
  'Duplicate': '复制',
  'Share': '共享',
  'Unlink': '取消关联',
  'Detach': '分离',
  'Convert': '转换',
  'Toggle': '切换',
  'Switch': '切换',
  'Select': '选择',
  'Choose': '选择',
  'Type': '输入',
  'Click': '点击',
  'Press': '按下',
  'Hold': '长按',
  'Drag': '拖动',
  'Drop': '放下',
  'Scroll': '滚动',

  // =========== Copy Actions ===========
  'Copy to clipboard': '复制到剪贴板',
  'Copy link': '复制链接',
  'Copy path': '复制路径',
  'Copy URL': '复制 URL',

  // =========== UI Sections ===========
  'Actions': '操作',
  'Status': '状态',
  'Details': '详情',
  'Summary': '摘要',
  'Title': '标题',
  'Tags': '标签',
  'Notes': '备注',

  // =========== Window ===========
  'Maximize': '最大化',
  'Minimize': '最小化',
  'Restore': '还原',
  'Resize': '调整大小',

  // =========== Position / Direction ===========
  'Top': '顶部',
  'Bottom': '底部',
  'Left': '左',
  'Right': '右',
  'Center': '居中',

  // =========== Layout ===========
  'Horizontal': '水平',
  'Vertical': '垂直',
  'Inline': '行内',
  'Block': '块',
  'Small': '小',
  'Medium': '中',
  'Large': '大',
  'Full': '全',

  // =========== Mode ===========
  'None': '无',
  'Auto': '自动',
  'Manual': '手动',

  // =========== Time ===========
  'Today': '今天',
  'Yesterday': '昨天',
  'Tomorrow': '明天',
  'Now': '现在',
  'Just now': '刚刚',
  'a moment ago': '刚刚',
  'a few seconds ago': '几秒前',

  // =========== Weekdays ===========
  'Monday': '星期一',
  'Tuesday': '星期二',
  'Wednesday': '星期三',
  'Thursday': '星期四',
  'Friday': '星期五',
  'Saturday': '星期六',
  'Sunday': '星期日',

  // =========== Months ===========
  'January': '一月',
  'February': '二月',
  'March': '三月',
  'April': '四月',
  'May': '五月',
  'June': '六月',
  'July': '七月',
  'August': '八月',
  'September': '九月',
  'October': '十月',
  'November': '十一月',
  'December': '十二月',

  // =========== Time AM/PM ===========
  'AM': '上午',
  'PM': '下午',

  // =========== Dev Actions ===========
  'Run': '运行',
  'Build': '构建',
  'Test': '测试',
  'Deploy': '部署',
  'Debug': '调试',
  'Customize': '自定义',
  'Personalize': '个性化',
  'Configure': '配置',

  // =========== Permissions ===========
  'Allow': '允许',
  'Deny': '拒绝',
  'Block': '阻止',
  'Trust': '信任',
  'Verify': '验证',
  'Check': '检查',

  // =========== Status Levels ===========
  'Success': '成功',
  'Warning': '警告',
  'Info': '信息',
  'Error': '错误',
  'Required': '必填',
  'Optional': '可选',
  'Recommended': '推荐',

  // =========== User Info ===========
  'Email': '邮箱',
  'Phone': '电话',
  'Address': '地址',

  // =========== Timestamps ===========
  'Created': '创建时间',
  'Updated': '更新时间',
  'Modified': '修改时间',
  'Accessed': '访问时间',

  // =========== Roles ===========
  'Owner': '所有者',
  'Member': '成员',
  'Admin': '管理员',
  'Guest': '访客',

  // =========== Connection Status ===========
  'Online': '在线',
  'Offline': '离线',
  'Away': '离开',
  'Busy': '忙碌',
  'Connected': '已连接',
  'Disconnected': '已断开',
  'Connecting': '正在连接',
  'Reconnecting': '正在重连',
  'Syncing': '同步中',
  'Uploading': '上传中',
  'Downloading': '下载中',
  'Processing': '处理中',
  'Verifying': '验证中',
  'Authenticating': '认证中',
  'Authorizing': '授权中',

  // =========== State ===========
  'Active': '活跃',
  'Inactive': '未激活',
  'Paused': '已暂停',
  'Suspended': '已停用',
  'Expanded': '已展开',
  'Collapsed': '已折叠',
  'Visible': '可见',
  'Hidden': '隐藏',
  'Transparent': '透明',

  // =========== Data Flow ===========
  'Source': '来源',
  'Target': '目标',
  'Origin': '源',
  'Destination': '目标',
  'Input': '输入',
  'Output': '输出',
  'Result': '结果',

  // =========== Infrastructure ===========
  'Cloud': '云端',
  'Configuration': '配置',
  'Deployment': '部署',
  'Database': '数据库',
  'Server': '服务器',
  'Client': '客户端',
  'Network': '网络',
  'API': 'API',
  'SDK': 'SDK',
  'CLI': 'CLI',
  'GUI': 'GUI',

  // =========== Bulk Actions ===========
  'Mark all as read': '全部标为已读',
  'Clear all': '全部清除',
  'Undo changes': '撤消更改',
  'Redo changes': '重做更改',
  'Discard draft': '丢弃草稿',
  'Save draft': '保存草稿',

  // =========== Social / Community ===========
  'Reply': '回复',
  'Forward': '转发',
  'Like': '点赞',
  'Unlike': '取消点赞',
  'Favorite': '收藏',
  'Unfavorite': '取消收藏',
  'Follow': '关注',
  'Unfollow': '取消关注',
  'Subscribe': '订阅',
  'Unsubscribe': '取消订阅',
  'Mute': '静音',
  'Unmute': '取消静音',
  'Silence': '静默',

  // =========== Archive / Lock ===========
  'Unarchive': '取消归档',
  'Lock': '锁定',
  'Unlock': '解锁',
  'Secure': '加密',

  // =========== File Browser ===========
  'Browse files...': '浏览文件...',
  'Choose a file...': '选择文件...',
  'Drop files here': '拖放文件到此处',
  'Upload files': '上传文件',
  'No file selected': '未选择文件',
  'No file chosen': '未选择文件',
  'All files': '所有文件',
  'All types': '所有类型',

  // =========== Load More ===========
  'Loading more results...': '正在加载更多结果...',
  'Load more results': '加载更多结果',
  'Scroll to bottom': '滚动到底部',
  'Scroll to top': '滚动到顶部',

  // =========== Navigation ===========
  'Go to line': '转到行',
  'Go to file': '转到文件',
  'Open containing folder': '打开所在文件夹',
  'Open in terminal': '在终端中打开',
  'Reveal in file explorer': '在文件浏览器中显示',
  'Show in Finder': '在 Finder 中显示',
  'Open in new tab': '在新标签页中打开',
  'Open in new window': '在新窗口中打开',
  'Open in split view': '在分屏视图中打开',
  'Close other tabs': '关闭其他标签页',
  'Close tabs to the right': '关闭右侧标签页',
  'Close all tabs': '关闭所有标签页',
  'Close tab': '关闭标签页',

  // =========== Window Controls ===========
  'Reload window': '重新加载窗口',
  'Toggle full screen': '切换全屏',
  'Zoom in': '放大',
  'Zoom out': '缩小',
  'Reset zoom': '重置缩放',
  'Force Reload': '强制重新加载',

  // =========== Feedback ===========
  'Share feedback': '分享反馈',
  'Report a bug': '报告 Bug',
  'Request a feature': '请求功能',
  'Code of Conduct': '行为准则',
  "What's New": "更新内容",
  'Getting Started': '入门指南',

  // =========== Command Palette ===========
  'Command Palette...': '命令面板...',
  'Open Command Palette': '打开命令面板',
  'Switch Theme': '切换主题',
  'Open Settings': '打开设置',
  'Open Preferences': '打开偏好设置',
  'View Shortcuts': '查看快捷键',

  // =========== Account ===========
  'Emdash Account': 'Emdash 账户',
  'Manage Account': '管理账户',

  // =========== Git Details ===========
  'No changes to display': '没有可显示的更改',
  'All changes committed': '所有更改已提交',
  'Nothing to commit': '没有可提交的内容',
  'Staged changes': '已暂存的更改',
  'Unstaged changes': '未暂存的更改',
  'Commit changes': '提交更改',
  'Push changes': '推送更改',
  'Pull changes': '拉取更改',
  'Merge changes': '合并更改',
  'Rebase changes': '变基更改',
  'View changes': '查看更改',
  'View diff': '查看差异',
  'View file': '查看文件',
  'Check out': '检出',
  'Checkout branch': '检出分支',
  'New branch': '新建分支',
  'Create new branch': '创建新分支',
  'Fetch origin': '从远程获取',
  'Fetch from remote': '从远程获取',
  'Pull from remote': '从远程拉取',
  'Push to remote': '推送到远程',

  // =========== Setup / Loading ===========
  'Project setup complete': '项目设置完成',
  'Creating workspace...': '正在创建工作区...',
  'Workspace ready': '工作区已就绪',
  'This may take a moment': '这可能需要一点时间',
  'Please wait': '请稍候',
  'Loading workspace...': '正在加载工作区...',
  'Preparing workspace...': '正在准备工作区...',
  'Scanning files...': '正在扫描文件...',
  'Indexing workspace...': '正在索引工作区...',

  // =========== Keyboard ===========
  'Search or type a command...': '搜索或输入命令...',
  'Type a command...': '输入命令...',
  'No shortcuts assigned': '未分配快捷键',
  'Press keys to assign': '按键以分配',

  // =========== Force Reload ===========
  'Force Reload': '强制重新加载',
};

let added = 0, skipped = 0;
for (const [en, zh] of Object.entries(translations)) {
  if (existing.has(en)) { skipped++; continue; }
  dict.exact[en] = zh;
  existing.add(en);
  added++;
}

// Sort
const sorted = {};
Object.keys(dict.exact).sort().forEach(k => { sorted[k] = dict.exact[k]; });
dict.exact = sorted;

writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2) + '\n', 'utf-8');

console.log(`Added ${added} translations, skipped ${skipped} (already in dict).`);
console.log(`Total exact entries: ${Object.keys(dict.exact).length}`);
