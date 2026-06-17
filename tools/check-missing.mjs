/**
 * check-missing.mjs — Check which extracted UI strings are missing from dictionary.
 * Usage: node tools/check-missing.mjs
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const dict = JSON.parse(readFileSync(join(ROOT, 'src', 'dict', 'zh-CN.json'), 'utf-8'));
const existing = new Set(Object.keys(dict.exact));

const candidates = [
  // Settings tabs
  'General','Appearance','Editor','Terminal','Integrations','Skills & MCP','Profile','Account',
  // Settings - sections
  'Global Settings','Appearance & Theme','Terminal Behavior','Editor Preferences','Keyboard Shortcuts',
  'Theme','Font','Zoom','Layout','Density',
  'Enabled','Disabled','Default','System','Light','Dark','Compact','Comfortable','Custom',
  // Profiles
  'Profiles','Create Profile','Delete Profile','Profile Name','Base Profile',
  // Account
  'Sign Out','Manage Account','Subscription','Usage','Billing',
  // Sidebar
  'Automations','Library','Give feedback','Pinned','Sort projects','Sort by','Created at','Last used','Add Project',
  'Drop to add project','Creating repository...','Cloning...','Registering...',
  'Collapse','Expand','Open project','Project not found at path','New task for',
  'Change SSH Connection','Remove Project',
  'Toggle left sidebar','Creating task workspace...','Update',
  'Cannot add project','Drop a folder to add it as a project.',
  'is not a git repository.','Failed to add','as a project.','Projects added','projects added.',
  // Settings - Task
  'Task Settings','Branch Settings','Worktree Settings','Lifecycle Scripts',
  // SSH
  'SSH Connections','Add Connection','Edit Connection','Delete Connection',
  // Git
  'GitHub Accounts','Add a GitHub account','Default branch','Base remote','Push remote',
  // Repository
  'Repository Settings','Worktree directory',
  // MCP/Skills
  'MCP Servers','Add MCP Server','Skills Directory',
  // Projects/Tasks
  'Active','Archived','Create Task','Task name','Task name...','Select a project',
  'Search projects...','Search tasks...','No tasks','No tasks found','Clear selection',
  // Task context menu
  'Unpin task','Pin task','Convert to regular task','Archive','Restore',
  'Copy branch name','Branch name copied','Copy failed',
  'The branch name could not be copied to the clipboard.',
  // Delete task
  'Delete task','will be permanently deleted. This action cannot be undone.',
  // Git changes
  'Commit','Commit & Push','Commit & Create PR','Commit message','Description',
  'Committing...','Opening PR...','Committed','Pushing...','Pushed',
  'Fetch changes','Fetching...','Pull changes','Pulling...','Nothing to pull',
  'Push changes','Nothing to push','Publish','Publishing...','Add Remote',
  'Staged','Changed','Nothing staged','Working tree clean',
  'Discard','Discard all','Stage','Stage all','Unstage','Unstage all',
  'Unstage selected files','Unstage all files',
  'Discard Files Changes','Discard All Changes',
  'Are you sure you want to discard the changes to the selected files? This can not be undone.',
  'Are you sure you want to discard all changes? This can not be undone.',
  // PR
  'Pull Requests','Create PR','Create draft PR','Create Pull Request','Create Draft PR',
  'Head Branch','Target','Base Branch','PR title','Select a base branch',
  'Files','Commits','Checks',
  'Merge pull request','Squash and merge','Rebase and merge',
  // Git tooltips
  'Nothing staged -- Stage files above to include them in a commit.',
  'Working tree clean -- No uncommitted file changes.',
  // Status
  'Merge status unknown','Draft pull request','Ready to merge','Merge conflicts',
  'Branch is out-of-date','Merging is blocked','Checks still running','Checks not passing',
  'Checks pending or not passing',
  // Conversations
  'Conversations','Create Conversation','Delete conversation','Agent',
  'Auto-approve permissions','Create','Creating...',
  // General
  'Learn more','Get started','Documentation','Report Issue',
  'Copy Installation ID','Troubleshooting',
  // Agent status
  'Agent is working','Agent is awaiting input','Agent error','Agent completed',
  // Empty states
  'Create a Task from a Branch','Create from Issue','Create from Pull Request',
  'Create a task from an existing branch','Link and create a task from an issue',
  'Create a task from a pull request','No remote repository connected',
  // Context bar
  'Add context','No context found','Add to input','Hide context bar',
  // Add remote modal
  'Add Remote','Create Repository','Link Existing','Create & Publish','Link & Publish',
  'Adding...','Owner','Visibility','Private','Public','Remote URL',
  // Changes view
  'Switch to tree view','Switch to flat list',
  // Git more
  'Detached HEAD','Create an initial commit first','Cannot publish: HEAD is detached',
  'Publish branch','Create or link a remote, then publish this branch',
  'A pull request is already open','Create a pull request','Refresh pull requests',
  'Pull requests unavailable','Could not load pull requests','No pull requests',
  'Push your branch and create a PR to start a review.',
  'Skip push and open a PR from the current remote state','Force full sync',
  'Full sync','Incremental sync','Single PR','Sync failed','Unknown error','Sync complete',
  'Syncing PRs...','Sync cancelled',
  'Loading comments...','Unable to load comments','No comments available','Resolved','Unknown author',
  'Load more','Loading more...','Loading files...','Unable to load files','No file changes',
  'No commits','No checks available','No checks or comments',
  'Binary file','Preview unavailable','Failed to load image','File added','File deleted',
  'Failed to decode image','Original','Modified','No changes',
  'Mark ready','Marking ready...','Merging...','Merge without waiting','Bypass rules and merge',
  'Resolve conflicts before merging.','Update the branch...',
  'Required reviews, checks, or branch rules...',
  'No conflicts or required reviews.','Mark ready for review to enable merging.',
  'Adding issue context...','Add issue context to the initial message',
  'Add a prompt to the initial message','Add an optional initial message...',
  'Auto approve','Prompt unavailable',
  'Add comment','Edit comment','Cancel (Esc)','Cancel comment','Submit','Submit comment',
  'Save comment','Edit comment','Delete comment','Update the note...',
  'Setting up project...','Failed to set up project','SSH not connected','Project not found',
  'Remove Project','Dismiss',
  'Share with team','Saving...','Saved','Save settings',
  'Detected external project config.','Import into Emdash',
  'Select a directory','Use this directory','Empty directory','Failed to list directory',
  'Select an SSH connection to browse remote directories.',
  'Select or add a connection','Choose','Browse','Back','Forward','Up one directory',
  'Local','SSH','GitHub CLI','OAuth','Device flow','Saved token',
  'Open','Closed','Search by title, branch, or number...','Sort...','Filter by',
  'Author','Label','Assignee',
  'Newest','Oldest','Recently Updated',
  'Open PR on GitHub','Review in Task',
  'Add the selected issue to the initial agent prompt when creating a task from an issue.',
  'Used for pull requests and issues in this project.',
  'Change where worktrees are created.',
  'The branch new tasks are created from by default.',
  'Used for fetching remote branches',
  'Used when publishing task branches and pushing commits.',
  'Run the agent session inside a tmux session.',
  'Unavailable GitHub account','No longer connected','No GitHub account','Same as base remote',
  'Lifecycle scripts','Shell commands run at each stage of the worktree lifecycle',
  'Auto-run on task creation','for the full project config reference.',
  'Preserve patterns','Shell setup','Setup script','Run script','Teardown script',
  'Commands used to provision and terminate BYOI infrastructure for tasks.',
  'Share settings with your team',
  'This writes the selected settings to .emdash.json',
  'Write to','Settings to share','Writing...','Wrote .emdash.json','Write .emdash.json',
  'Overriding','Use team settings','Use team settings for','Reset changes',
  'Import project config','Settings to import','Save to','Importing...','Imported','Import',
  'Delete project','will be deleted. The project folder and worktrees will stay on the filesystem.',
  'Provider:','Identifier:','URL:','Project:',
  'Initial Conversation','Workspace Settings',
  'Based on','Issue','Pull Request',
  'Select a project directory to open',
  'This directory is not a git repository.','Initialize git repository',
  'Enter a project name','Enter a repository name','Enter a repository URL',
  'Project Name','Project Directory','Remote Directory','Repository URL',
  'Task names only allow letters, numbers, and hyphens.','Prompts',
  'SSH channel unavailable',
  'Add a connection to create and manage remote projects.',
  'Advanced settings','Additional parameters','Add variable',
  'Agent Settings','Agents','All','An error occurred',
  'Configure issue integrations',
  // More settings strings
  'App Settings','Project settings',
  'No changes -- Select or make changes to files to see diffs.',
  'Binary file -- no diff available',
  'Preview unavailable on SSH workspaces',
  'Preview unavailable for this format',
  'Preview unavailable -- file is too large',
  'Preview unavailable -- Git LFS smudge filter not applied',
  'Select config',
  'Failed to import project config.',
  '.emdash.json -- commit to share with team',
  'Settings -- local to this machine',
  // Agent detail
  'Installed','Available','Install','Uninstall','Configure','Update Available',
  'Running','Stopped','Version',
  // Navigation
  'Go Back','Go Forward',
  // General settings more
  'Language','Region','Cache','Clear Cache','Logs','Open Logs Folder',
  // Telemetry
  'Telemetry','Usage Data','Send anonymous usage data',
  // Updates
  'Updates','Check for Updates','Auto-update','Current Version','Release Notes',
  // Experimental
  'Experimental','Experimental Features',
  // CSP/Policy
  'Privacy Policy','Terms of Service',
];

// Check missing
let missing = [];
for (const s of candidates) {
  if (!existing.has(s)) {
    missing.push(s);
  }
}

console.log(`Missing: ${missing.length} of ${candidates.length}`);
console.log('');
for (const s of missing) {
  console.log(s);
}
