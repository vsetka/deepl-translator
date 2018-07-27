const request = require('./request-helper');

const DEEPL_HOSTNAME = 'www2.deepl.com';
const DEEPL_ENDPOINT = '/jsonrpc';

function getHandleJobsBody(texts, targetLanguage, sourceLanguage, beginning) {
  return {
    jsonrpc: '2.0',
    method: 'LMT_handle_jobs',
    params: {
      jobs: texts.map(text => {
        return {
          kind: 'default',
          raw_en_sentence: text,
          de_sentence_beginning: beginning,
        };
      }),
      lang: {
        user_preferred_langs: ['EN'],
        source_lang_user_selected: sourceLanguage,
        target_lang: targetLanguage,
      },
      priority: -1,
    },
    id: 1,
  };
}

function getAlternativesBody(text, targetLanguage, sourceLanguage, beginning) {
  return {
    jsonrpc: '2.0',
    method: 'LMT_handle_jobs',
    params: {
      jobs: [
        {
          de_sentence_beginning: beginning,
          kind: 'alternatives_at_position',
          raw_en_sentence: text,
        },
      ],
      lang: {
        source_lang_computed: sourceLanguage,
        target_lang: targetLanguage,
      },
      priority: 1,
    },
    id: 1,
  };
}

function getSplitSentencesBody(texts, sourceLanguage) {
  return {
    jsonrpc: '2.0',
    method: 'LMT_split_into_sentences',
    params: {
      texts,
      lang: {
        lang_user_selected: sourceLanguage,
        user_preferred_langs: ['EN'],
      },
    },
    id: 1,
  };
}

function getRequestOptions(postBody) {
  return {
    hostname: DEEPL_HOSTNAME,
    port: 443,
    protocol: 'https:',
    path: DEEPL_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(postBody)),
      'Cache-Control': 'no-cache',
    },
  };
}

module.exports = {
  getTranslation: (texts, targetLanguage, sourceLanguage, beginning) => {
    const postBody = getHandleJobsBody(
      texts,
      targetLanguage,
      sourceLanguage,
      beginning
    );
    const options = getRequestOptions(postBody);

    return request(options, postBody);
  },
  splitSentences: (texts, sourceLanguage) => {
    const postBody = getSplitSentencesBody(texts, sourceLanguage);
    const options = getRequestOptions(postBody);

    return request(options, postBody);
  },
  getAlternatives: (text, targetLanguage, sourceLanguage, beginning) => {
    const postBody = getAlternativesBody(
      text,
      targetLanguage,
      sourceLanguage,
      beginning
    );
    const options = getRequestOptions(postBody);

    return request(options, postBody);
  },
};
