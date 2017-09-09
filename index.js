const languages = require('./languages');
const https = require('https');

const DEEPL_HOSTNAME = 'www.deepl.com';
const DEEPL_ENDPOINT = '/jsonrpc';

function detectLanguage(text) {
  return translate(text, 'EN').then(result => {
    return {
      languageCode: result.resolvedSourceLanguage,
      languageName: languages[result.resolvedSourceLanguage],
    };
  });
}

function translate(text, targetLanguage, sourceLanguage = 'auto') {
  return new Promise((resolve, reject) => {
    if (sourceLanguage !== 'auto' && !languages[sourceLanguage]) {
      reject(new Error(`Invalid source language code ${sourceLanguage}`));
    } else if (!languages[targetLanguage]) {
      reject(new Error(`Invalid target language code ${targetLanguage}`));
    } else if (targetLanguage === sourceLanguage) {
      reject(new Error(`Target and source language codes identical`));
    } else if (typeof text !== 'string' || text.trim().length === 0) {
      reject(new Error(`Must provide text for translation`));
    } else {
      const postBody = getPostBody(text, targetLanguage, sourceLanguage);
      const options = getRequestOptions(postBody);

      const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', body => {
          try {
            resolve(parseResponse(body));
          } catch (exception) {
            reject(new Error(`Unexpected error when parsing body: ${body}`));
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify(postBody));
      req.end();
    }
  });
}

function getPostBody(text, targetLanguage, sourceLanguage) {
  return {
    jsonrpc: '2.0',
    method: 'LMT_handle_jobs',
    params: {
      jobs: [
        {
          kind: 'default',
          raw_en_sentence: text,
        },
      ],
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

function parseResponse(response) {
  const {
    result: {
      target_lang: targetLanguage,
      source_lang: resolvedSourceLanguage,
      translations: [{ beams: [{ postprocessed_sentence: translation }] }],
    },
  } = JSON.parse(response);

  return {
    targetLanguage,
    resolvedSourceLanguage,
    translation,
  };
}

module.exports = {
  translate,
  detectLanguage,
};
