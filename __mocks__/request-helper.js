const translationMap = require('./translationMap');

module.exports = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const { params: { jobs: [{ raw_en_sentence: inputText }] } } = postBody;

    process.nextTick(
      () =>
        !translationMap[inputText] ? reject(new Error('This input should throw')) : resolve(translationMap[inputText])
    );
  });
};
