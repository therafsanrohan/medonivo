const fs = require('fs');
const path = require('path');

function hasEmoji(str) {
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/u;
  return emojiRegex.test(str);
}

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx') || dirFile.endsWith('.md')) {
          filelist.push(dirFile);
        }
      }
    } catch (err) {
      // ignore
    }
  });
  return filelist;
}

const apps = ['apps/care', 'apps/workspace', 'apps/control'];
const files = [];
apps.forEach(app => {
  files.push(...walkSync(path.join(app, 'src')));
});

const filesWithEmojis = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (hasEmoji(content)) {
    filesWithEmojis.push(file);
  }
});

console.log(filesWithEmojis.join('\n'));
