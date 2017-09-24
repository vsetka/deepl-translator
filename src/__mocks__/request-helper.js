const translationMap = require('./fixtures/translation-map');
const splitMap = require('./fixtures/split-map');

function handleSplitSentences(options, postBody) {
  return new Promise((resolve, reject) => {
    const { params: { texts: [inputText] } } = postBody;

    process.nextTick(
      () =>
        !splitMap[inputText]
          ? reject(new Error('This input should throw'))
          : resolve(splitMap[inputText])
    );
  });
}

function handleTranslateJobs(options, postBody) {
  return new Promise((resolve, reject) => {
    const { params: { jobs: [{ raw_en_sentence: inputText }] } } = postBody;

    process.nextTick(
      () =>
        !translationMap[inputText]
          ? reject(new Error('This input should throw'))
          : resolve(translationMap[inputText])
    );
  });
}

module.exports = (options, postBody) => {
  return postBody.method === 'LMT_split_into_sentences'
    ? handleSplitSentences(options, postBody)
    : handleTranslateJobs(options, postBody);
};
