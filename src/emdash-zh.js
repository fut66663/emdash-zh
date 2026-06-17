/**
 * emdash-zh — Chinese localization engine for Emdash
 * MIT License | https://github.com/xxx/emdash-zh
 *
 * Injects Chinese translations into Emdash's React UI at runtime.
 * Works via MutationObserver + TreeWalker pattern.
 * Independent of Emdash version — re-run install.bat after updates.
 */

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

  // ============================================================
  // 1. TRANSLATION DICTIONARY (built-time inline)
  // ============================================================
  var DICT = {
    exact: {
      // ---- General UI ----
      "Cancel": "取消",
      "Save": "保存",
      "Delete": "删除",
      "Close": "关闭",
      "Open": "打开",
      "Copy": "复制",
      "Paste": "粘贴",
      "Search": "搜索",
      "Confirm": "确认",
      "Dismiss": "忽略",
      "Retry": "重试",
      "Resume": "继续",
      "Discard": "放弃",
      "Add": "添加",
      "Remove": "移除",
      "Edit": "编辑",
      "Create": "创建",
      "Rename": "重命名",
      "Export": "导出",
      "Import": "导入",
      "Refresh": "刷新",
      "Reset": "重置",
      "Clear": "清除",
      "Filter": "筛选",
      "Sort": "排序",
      "Enable": "启用",
      "Disable": "禁用",
      "Loading...": "加载中...",
      "Saving...": "保存中...",
      "Deleting...": "删除中...",
      "No results": "无结果",
      "No data": "无数据",
      "Learn more": "了解更多",
      "Get started": "开始使用",
      "Show more": "显示更多",
      "Show less": "收起",
      "View all": "查看全部",
      "Select all": "全选",
      "Deselect all": "取消全选",
      "Are you sure?": "确定吗？",

      // ---- Navigation ----
      "Settings": "设置",
      "Preferences": "偏好设置",
      "Appearance": "外观",
      "Theme": "主题",
      "General": "通用",
      "Keyboard Shortcuts": "键盘快捷键",
      "Keybindings": "快捷键",
      "Account": "账户",
      "Profile": "个人资料",
      "Notifications": "通知",
      "Language": "语言",
      "About": "关于",
      "Version": "版本",
      "Workspace": "工作区",
      "Projects": "项目",
      "Tasks": "任务",
      "Library": "库",
      "Terminal": "终端",
      "Command Palette": "命令面板",
      "Search files, actions, agents...": "搜索文件、操作、智能体...",

      // ---- Projects ----
      "New Project": "新建项目",
      "Create Project": "创建项目",
      "Open project": "打开项目",
      "Create repository": "创建仓库",
      "Clone from GitHub": "从 GitHub 克隆",
      "Add remote project": "添加远程项目",
      "Open a local project": "打开本地项目",
      "Create a project from an existing local directory": "从现有本地目录创建项目",
      "Create a project by creating a new repository on GitHub": "在 GitHub 上创建新仓库来建立项目",
      "Clone a GitHub repository to work on locally": "克隆 GitHub 仓库到本地",
      "Create a project on a remote SSH server": "在远程 SSH 服务器上创建项目",

      // ---- Tasks / Agent ----
      "Add Task": "添加任务",
      "Create Task": "创建任务",
      "Delete Task": "删除任务",
      "Start Task": "启动任务",
      "Stop Task": "停止任务",
      "Task List": "任务列表",
      "Active Tasks": "活跃任务",
      "Completed Tasks": "已完成任务",
      "Conversation": "对话",
      "New Conversation": "新建对话",
      "Send": "发送",
      "Stop": "停止",
      "Regenerate": "重新生成",
      "Clear Chat": "清空对话",
      "Copy Response": "复制回复",
      "Thinking...": "思考中...",
      "Running...": "运行中...",
      "Awaiting input": "等待输入",
      "Agent completed": "Agent 完成",
      "Agent error": "Agent 错误",

      // ---- Git ----
      "Commit": "提交",
      "Push": "推送",
      "Pull": "拉取",
      "Fetch": "获取",
      "Branch": "分支",
      "Merge": "合并",
      "Rebase": "变基",
      "Stash": "暂存",
      "Changes": "更改",
      "Staged": "已暂存",
      "Unstaged": "未暂存",
      "Diff": "差异",
      "Commit Message": "提交信息",
      "Create Branch": "创建分支",
      "Switch Branch": "切换分支",
      "Delete Branch": "删除分支",
      "View on GitHub": "在 GitHub 查看",
      "Open PR": "打开 PR",
      "Create PR": "创建 PR",
      "Pull Request": "拉取请求",
      "Create Pull Request": "创建拉取请求",

      // ---- Providers / Agents ----
      "Providers": "提供商",
      "Agent": "智能体",
      "Agents": "智能体",
      "Add Provider": "添加提供商",
      "Auto-approve": "自动批准",
      "Select a provider": "选择提供商",
      "Model": "模型",
      "Models": "模型",
      "Default Model": "默认模型",

      // ---- Settings panels ----
      "Editor": "编辑器",
      "Font Size": "字体大小",
      "Font Family": "字体",
      "Tab Size": "Tab 大小",
      "Word Wrap": "自动换行",
      "Line Numbers": "行号",
      "Minimap": "小地图",
      "Auto Save": "自动保存",
      "Format on Save": "保存时格式化",
      "Color Theme": "颜色主题",
      "Light": "浅色",
      "Dark": "深色",
      "System": "系统",

      // ---- SSH / Remote ----
      "SSH": "SSH",
      "Remote": "远程",
      "Connect": "连接",
      "Disconnect": "断开连接",
      "Host": "主机",
      "Port": "端口",
      "Username": "用户名",
      "Password": "密码",
      "SSH Key": "SSH 密钥",

      // ---- Integrations ----
      "Integrations": "集成",
      "Connect to GitHub": "连接 GitHub",
      "Connect to Linear": "连接 Linear",
      "Connect to Jira": "连接 Jira",
      "Sign In": "登录",
      "Sign Out": "退出登录",
      "Authorize": "授权",
      "Token": "令牌",
      "API Key": "API 密钥",

      // ---- Misc ----
      "Feedback": "反馈",
      "Send Feedback": "发送反馈",
      "Documentation": "文档",
      "Community": "社区",
      "Discord": "Discord",
      "Check for Updates": "检查更新",
      "Update Available": "有可用更新",
      "Restart to Update": "重启以更新",
      "Something went wrong": "出了点问题",
      "An unexpected error occurred": "发生了意外错误",
      "Please try again": "请重试",
      "Could not connect": "无法连接",
      "Connection lost": "连接断开",
      "Authentication failed": "认证失败",
      "Permission denied": "权限不足",
      "Copied to clipboard": "已复制到剪贴板",
      "Changes saved": "更改已保存",
      "Changes discarded": "更改已放弃",

      // ---- Sidebar ----
      "Toggle Sidebar": "切换侧边栏",
      "Left Sidebar": "左侧边栏",
      "Right Sidebar": "右侧边栏",
      "Collapse All": "全部折叠",
      "Expand All": "全部展开",
      "Files": "文件",
      "Search files": "搜索文件",
    },

    regex: [
      {
        id: "time-ago-seconds",
        pattern: /^(\d+)\s+seconds?\s+ago$/i,
        replace: "$1 秒前"
      },
      {
        id: "time-ago-minutes",
        pattern: /^(\d+)\s+minutes?\s+ago$/i,
        replace: "$1 分钟前"
      },
      {
        id: "time-ago-hours",
        pattern: /^(\d+)\s+hours?\s+ago$/i,
        replace: "$1 小时前"
      },
      {
        id: "time-ago-days",
        pattern: /^(\d+)\s+days?\s+ago$/i,
        replace: "$1 天前"
      },
      {
        id: "updated-ago",
        pattern: /^Updated\s+(.+)\s+ago$/i,
        replace: "$1前更新"
      },
      {
        id: "count-tasks",
        pattern: /^(\d+)\s+tasks?$/i,
        replace: "$1 个任务"
      },
      {
        id: "count-files",
        pattern: /^(\d+)\s+files?$/i,
        replace: "$1 个文件"
      },
      {
        id: "count-projects",
        pattern: /^(\d+)\s+projects?$/i,
        replace: "$1 个项目"
      },
      {
        id: "count-agents",
        pattern: /^(\d+)\s+agents?$/i,
        replace: "$1 个智能体"
      },
      {
        id: "count-errors",
        pattern: /^(\d+)\s+errors?$/i,
        replace: "$1 个错误"
      },
      {
        id: "count-warnings",
        pattern: /^(\d+)\s+warnings?$/i,
        replace: "$1 个警告"
      },
      {
        id: "count-changes",
        pattern: /^(\d+)\s+changes?$/i,
        replace: "$1 处更改"
      },
      {
        id: "count-commits",
        pattern: /^(\d+)\s+commits?$/i,
        replace: "$1 个提交"
      },
      {
        id: "count-branches",
        pattern: /^(\d+)\s+branches?$/i,
        replace: "$1 个分支"
      },
      {
        id: "count-conversations",
        pattern: /^(\d+)\s+conversations?$/i,
        replace: "$1 个对话"
      },
      {
        id: "requests-remaining",
        pattern: /^(\d+)\s+requests?\s+remaining$/i,
        replace: "$1 次请求剩余"
      },
      {
        id: "version-string",
        pattern: /^Version\s+(.+)$/i,
        replace: "版本 $1"
      },
      {
        id: "no-results-for",
        pattern: /^No results for (.+)$/i,
        replace: "未找到 \"$1\" 的结果"
      },
      {
        id: "syncing-prs",
        pattern: /^Syncing PRs:\s+(\d+)\s*\/\s*(\d+)$/i,
        replace: "同步 PR 中: $1 / $2"
      },
      {
        id: "active-count",
        pattern: /^Active\s*\((\d+)\)$/i,
        replace: "活跃 ($1)"
      },
      {
        id: "archived-count",
        pattern: /^Archived\s*\((\d+)\)$/i,
        replace: "已归档 ($1)"
      },
      {
        id: "n-selected",
        pattern: /^(\d+)\s+selected$/i,
        replace: "已选中 $1 项"
      },
      {
        id: "n-items",
        pattern: /^(\d+)\s+items?$/i,
        replace: "$1 项"
      },
      {
        id: "count-results",
        pattern: /^(\d+)\s+results?$/i,
        replace: "$1 个结果"
      },
      {
        id: "count-minutes",
        pattern: /^(\d+)\s+min(ute)?s?$/i,
        replace: "$1 分钟"
      },
      {
        id: "count-hours",
        pattern: /^(\d+)\s+hours?$/i,
        replace: "$1 小时"
      },
      {
        id: "count-days",
        pattern: /^(\d+)\s+days?$/i,
        replace: "$1 天"
      },
      {
        id: "deleted-permanently-warning",
        pattern: /^"(.+)" will be permanently deleted\./i,
        replace: "\"$1\" 将被永久删除。"
      },
      {
        id: "delete-n-tasks-warning",
        pattern: /^(\d+) tasks? will be permanently deleted\./i,
        replace: "$1 个任务将被永久删除。"
      }
    ]
  };

  // Build lowercase lookup map
  var exactLower = {};
  for (var k in DICT.exact) {
    if (DICT.exact.hasOwnProperty(k)) {
      exactLower[k.toLowerCase()] = DICT.exact[k];
    }
  }

  // Regex result cache: string → translated string
  var regexCache = {};

  // ============================================================
  // 2. SKIP LOGIC
  // ============================================================

  var BLACKLIST_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA',
    'CODE', 'PRE', 'KBD', 'SAMP', 'VAR',
    'CANVAS', 'SVG', 'IFRAME', 'WEBVIEW'
  ]);

  function shouldSkip(node) {
    var el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return true;

    // Walk up ancestors; stop at body
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

    // Already >30% CJK — assume translated
    var cnCount = (trimmed.match(/[一-鿿]/g) || []).length;
    if (cnCount / trimmed.length > 0.3) return true;

    return false;
  }

  // ============================================================
  // 3. TRANSLATION ENGINE
  // ============================================================

  function translateTextNode(textNode) {
    var original = textNode.textContent;
    var trimmed = original.trim();
    if (!trimmed) return;

    // Step 1: Exact match
    if (DICT.exact.hasOwnProperty(trimmed)) {
      textNode.textContent = original.replace(trimmed, DICT.exact[trimmed]);
      STATE.totalTranslations++;
      return;
    }

    // Step 2: Case-insensitive match
    var entry = exactLower[trimmed.toLowerCase()];
    if (entry) {
      textNode.textContent = original.replace(trimmed, entry);
      STATE.totalTranslations++;
      return;
    }

    // Step 3: Cache lookup
    var cached = regexCache[trimmed];
    if (cached !== undefined) {
      if (cached !== null) {
        textNode.textContent = original.replace(trimmed, cached);
        STATE.totalTranslations++;
      }
      return;
    }

    // Step 4: Regex patterns
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

    // No match — cache as null to avoid retesting
    regexCache[trimmed] = null;
    STATE.untranslated[trimmed] = (STATE.untranslated[trimmed] || 0) + 1;
  }

  // ============================================================
  // 4. DOM WALKER + BATCHING
  // ============================================================

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

  // Translate element attributes
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

  // ============================================================
  // 5. MUTATION OBSERVER
  // ============================================================

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

  // ============================================================
  // 6. INITIALIZATION
  // ============================================================

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
      // Clear old session log
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
