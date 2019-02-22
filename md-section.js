function repeat(txt, n) {
  return Array.from({ length: n })
    .fill(txt)
    .join("");
}

module.exports.getHeadlines = function getHeadlines(text, { minLevel = 1, maxLevel = 2 } = {}) {
  const res = text.match(/^#.*$/gm);
  if (!res) return [];

  return res.reduce(function(acc, title) {
    const levelRes = new RegExp(`^(#{${minLevel},${maxLevel}})[^#]`).exec(title);
    if (!levelRes) return acc;
    const contentRes = /^#+\s*(.*)$/.exec(title);
    return acc.concat({
      level: levelRes[1].length,
      content: contentRes ? contentRes[1] : ""
    });
  }, []);
};

function getAllHigherLevels(n) {
  let arr = [];
  for (let i = n; i > 0; i--) {
    arr.push(repeat("#", i));
  }
  return new RegExp(`^(${arr.join("|")})\\s`);
}

module.exports.getSection = function getSection(text, titleObj) {
  const l = titleObj.level;
  const levelsRegex = getAllHigherLevels(titleObj.level);
  const titleRegex = new RegExp(`^[ \\t]*#{${l}}\\s+${titleObj.content}.*$`, "i");
  let splittedText = text.split(/\r?\n/);

  let hasVisited = false;
  const total = [];
  for (let line of splittedText) {
    if (!hasVisited && line.match(titleRegex) != null) {
      hasVisited = true;
    } else if (hasVisited && line.match(levelsRegex) != null) {
      break;
    }

    if (hasVisited) {
      total.push(line);
    }
  }
  return total.join("\n");
};
