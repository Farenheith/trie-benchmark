const Benchmark = require('benchmark');
const { createTrie, matchesTrie, createArrTrie, matchesArrTrie } = require('./create-trie');
const { wordList } = require('./word-list');

const trie = createTrie(wordList);
const arrTrie = createArrTrie(wordList);
const last = wordList[wordList.length - 1];
const notFound = 'creed';

const suite = Benchmark.Suite();


const notFoundArray = !!wordList.find((x) => x === notFound);
let regex = new RegExp(notFound);
const notFoundRegEx = !!wordList.find((x) => regex.test(x));
const notFoundTrie = !!matchesTrie(notFound, trie);
const notFoundArrTrie = !!matchesArrTrie(notFound, arrTrie);

if (notFoundArray !== notFoundRegEx || notFoundArray !== notFoundTrie || notFoundArray !== notFoundArrTrie) {
    throw new Error('found error');
}

const foundArray = !!wordList.find((x) => x === last);
regex = new RegExp(last);
const foundRegEx = !!wordList.find((x) => regex.test(x));
const foundTrie = !!matchesTrie(last, trie);
const arrFoundTrie = !!matchesArrTrie(last, arrTrie);

if (foundArray !== foundRegEx || foundArray !== foundTrie || foundArray !== arrFoundTrie) {
    throw new Error('found error');
}

suite.add('array search (not found)', () => {
    wordList.find((x) => x.startsWith(notFound));
}).add('array regex (not found)', () => {
    const regex = new RegExp(`\\b${notFound}`);
    wordList.find((x) => regex.test(x));
}).add('trie search (not found)', () => {
    matchesTrie(notFound, trie);
}).add('arrTrie search (not found)', () => {
    matchesArrTrie(notFound, arrTrie);
}).add('array search (found)', () => {
    wordList.find((x) => x.startsWith(last));
}).add('array regex (found)', () => {
    const regex = new RegExp(`\\b${last}`);
    wordList.find((x) => regex.test(x));
}).add('trie search (found)', () => {
    matchesTrie(last, trie);
}).add('arrTrie search (found)', () => {
    matchesArrTrie(last, arrTrie);
}).on('cycle', function(event) {
    console.log(`${event.target}`);
}).on('error', (err) => {
    console.log(err);
}).run()