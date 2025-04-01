const examples = [
  ["Create a git repository", "git init"],
  ["Return the current state of the repository", "git status"],
  ["Remove file bar.js from the staging area", "git rm -f bar.js"],
  ["Add file bar.js to the staging area for git", "git add bar.js"],
  ["Show the chronological commit history for a repository", "git log"],
  ["Switch to an existing branch called main", "git checkout main"],
  ["Create and switch to a new branch called main", "git checkout -b main"],
  [
    "Add all files in the current directory to the staging area for git",
    "git add .",
  ],
  [
    "Clone the remote repository https://github.com/natmfat/machine-learning into the current directory",
    "git clone https://github.com/natmfat/machine-learning .",
  ],
  [
    "Add an new origin https://github.com/natmfat/git-translator.git",
    "git remote add origin https://github.com/natmfat/git-translator.git",
  ],
];

export const buildBasePrompt = () => {
  let basePrompt = "";
  for (const [english, output] of examples) {
    basePrompt += `English: ${english}\nOutput: ${output}\n`;
  }

  return `Translate the English sentences into their appropriate git command(s).\n${basePrompt}`.trim();
};
