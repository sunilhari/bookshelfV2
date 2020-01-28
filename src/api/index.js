const data = require("./data.json");
const sw = require("stopword");

const wordsMap = {};
const summaryIdToSummary = {};
function cleanse(str) {
 return str
  .toLowerCase()
  .replace(/\./g, "")
  .replace(/,/g, "")
  .replace(/'/g, "");
}
function getWordMap(summaryId, summary) {
 const words = sw.removeStopwords(summary.split(" "));
 for (let i = 0; i < words.length; i++) {
  const word = cleanse(words[i]);
  wordsMap[word] = wordsMap[word] || {};
  wordsMap[word][summaryId] = !wordsMap[word][summaryId]
   ? 0
   : wordsMap[word][summaryId];
  wordsMap[word][summaryId] = wordsMap[word][summaryId] + 1;
 }
}
function preprocess() {
 for (let i = 0; i < data.summaries.length; i++) {
  const { titles, queries, summaries, authors } = data;
  const { id, summary } = summaries[i];
  summaryIdToSummary[id] = {
   id: id,
   summary,
   title: titles[i],
   query: queries[i],
   author: authors[i].author
  };
  getWordMap(id, summary);
 }
 //console.log(wordsMap);
}

function search(searchStr = "", noOfResult = 4) {
 preprocess();
 const searchWords = searchStr.split(" ");
 const summary = {};
 const List = [];
 for (let i = 0; i < searchWords.length; i++) {
  const word = searchWords[i];
  const keys = wordsMap[word] ? Object.keys(wordsMap[word]) : [];
  for (let i = 0; i < keys.length; i++) {
   summary[keys[i]] = !summary[keys[i]] ? 0 : summary[keys[i]];
   summary[keys[i]] = summary[keys[i]] + wordsMap[word][keys[i]];
  }
 }
 for (let i = 0; i < Object.keys(summary).length; i++) {
  List.push({
   score: summary[Object.keys(summary)[i]],
   ...summaryIdToSummary[Object.keys(summary)[i]]
  });
 }
 const sortedList = List.sort((obj1, obj2) => {
  if (obj1.score < obj2.score) {
   return 1;
  }
  if (obj1.score >= obj2.score) {
   return -1;
  }
  return 0;
 });
 return sortedList.splice(0, noOfResult);
}

export { search };

/**
 * {
 * 3:develop.3 + new.3
 *
 * }
 */
