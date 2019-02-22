# md-section

Get specific sections of markdown files based on headings.

```js
const markdown = `
# My text

## Sub title 1

Content 1

## Sub title 2

Content 2
`;

const { getHeadlines, getSection } = require("md-sections");
const headlines = getHeadlines(markdown);

console.log(headlines);
// [
//   { level: 1, content: "My text" },
//   { level: 2, content: "Sub title 1" },
//   { level: 2, content: "Sub title 2" }
// ];

console.log(getSection(markdown, headlines[1]));
// ## Sub title 1
//
// Content 1
```

Or limited by max/min levels:

```js
const markdown = `
# My text

## Sub title 1

Content 1

### Sub sub title 1

Content 1.1

## Sub title 2

Content 2
`;

const { getHeadlines, getSection } = require("md-sections");
const headlines = getHeadlines(markdown, { minLevel: 2, maxLevel: 2 });

console.log(headlines);
// [{ level: 2, content: "Sub title 1" }, { level: 2, content: "Sub title 2" }];

console.log(getSection(markdown, headlines[1]));
// ## Sub title 2
//
// Content 2
```
