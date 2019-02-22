import test from "ava";
import { getHeadlines, getSection } from "../md-section";
import fs from "fs";

const fixture = fs.readFileSync(__dirname + "/fixture.md").toString();

test("should return headlines", t => {
  t.deepEqual(getHeadlines(fixture), [
    { level: 1, content: "My text" },
    { level: 2, content: "Sub title 1" },
    { level: 2, content: "Sub title 2" }
  ]);
});

test("should equal itself if h1", t => {
  t.is(getSection(fixture, getHeadlines(fixture)[0]), fixture);
});

test("should get specific sections", t => {
  t.is(
    getSection(fixture, getHeadlines(fixture)[1]),
    `## Sub title 1

Content 1
`
  );
});
