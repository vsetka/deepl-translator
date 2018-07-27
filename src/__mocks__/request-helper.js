const translationMap = require('./fixtures/translation-map');
const splitMap = require('./fixtures/split-map');
const alternativeMap = require('./fixtures/alternative-map');
const translationBeginningMap = require('./fixtures/translation-beginning-map');

function handleSplitSentences(options, postBody) {
  return new Promise((resolve, reject) => {
    const {
      params: {
        texts: [inputText],
      },
    } = postBody;

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
    const {
      params: {
        jobs: [{ raw_en_sentence: inputText }],
      },
    } = postBody;

    process.nextTick(
      () =>
        !translationMap[inputText]
          ? reject(new Error('This input should throw'))
          : resolve(translationMap[inputText])
    );
  });
}

function handleTranslateBeginningJobs(options, postBody) {
  return new Promise((resolve, reject) => {
    const {
      params: {
        jobs: [
          { raw_en_sentence: inputText, de_sentence_beginning: beginning },
        ],
      },
    } = postBody;

    process.nextTick(
      () =>
        !translationBeginningMap[inputText][beginning]
          ? reject(new Error('This input should throw up'))
          : resolve(translationBeginningMap[inputText][beginning])
    );
  });
}

function handleAlternativeJobs(option, postBody) {
  return new Promise((resolve, reject) => {
    const {
      params: {
        jobs: [{ de_sentence_beginning: beginning }],
      },
    } = postBody;

    process.nextTick(
      () =>
        !alternativeMap[beginning]
          ? reject(new Error('This input should throw'))
          : resolve(alternativeMap[beginning])
    );
  });
}

module.exports = (options, postBody) => {
  if (postBody.method === 'LMT_split_into_sentences') {
    return handleSplitSentences(options, postBody);
  }
  if (postBody.params.jobs[0].kind === 'default') {
    return !postBody.params.jobs[0].de_sentence_beginning
      ? handleTranslateJobs(options, postBody)
      : handleTranslateBeginningJobs(options, postBody);
  }
  return handleAlternativeJobs(options, postBody);
};
