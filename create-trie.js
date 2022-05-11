function createTrie(list) {
    const trie = {};

    for (const item of list) {
        let current = trie;
        for (const char of item) {
            let node = current[char];
            if (!node) {
                node = current[char] = {};
            }
            current = node;
        }
        current.word = {};
    }

    return trie;
}

function matchesTrie(word, trie) {
    let current = trie;
    const { length } = word;
    for (let i= 0; i < length; i++) {
      current = current[word[i]];
      if (!current) {
        return 0;
      }
    }
    return current.word ? 2 : 1;
  }


// array version
function createArrTrie(list) {
    const trie = {};

    for (const item of list) {
        let current = trie;
        for (const char of item) {
            let node = current[char.charCodeAt(0) - 97];
            if (!node) {
                node = current[char.charCodeAt(0) - 97] = Array(26);
            }
            current = node;
        }
        current.word = {};
    }

    return trie;
}

function matchesArrTrie(word, trie) {
    let current = trie;
    const { length } = word;
    for (let i= 0; i < length; i++) {
      current = current[word[i].charCodeAt(0) - 97];
      if (!current) {
        return 0;
      }
    }
    return current.word ? 2 : 1;
}

module.exports = {
    createTrie,
    matchesTrie,
    createArrTrie,
    matchesArrTrie,
}