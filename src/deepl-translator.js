const languages = require('./languages');
const deeplApiHelper = require('./deepl-api-helper');
const { EOL } = require('os');

function detectLanguage(text) {
  return translate(text, 'EN').then(({ resolvedSourceLanguage }) => {
    return {
      languageCode: resolvedSourceLanguage,
      languageName: languages[resolvedSourceLanguage],
    };
  });
}

function validateInputs(text, targetLanguage, sourceLanguage) {
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
      resolve(true);
    }
  });
}

function translate(text, targetLanguage, sourceLanguage = 'auto') {
  return validateInputs(text, targetLanguage, sourceLanguage)
    .then(valid =>
      deeplApiHelper.splitSentences(text.split(EOL), sourceLanguage)
    )
    .then(splitResponse => transformSplitSentencesResponse(splitResponse))
    .then(([bucketSizes, texts, detectedInputLanguage]) =>
      deeplApiHelper
        .getTranslation(texts, targetLanguage, detectedInputLanguage)
        .then(response => transformTranslationResponse(bucketSizes, response))
    );
}

function transformTranslationResponse(bucketSizes, response) {
  try {
    const {
      result: {
        target_lang: targetLanguage,
        source_lang: resolvedSourceLanguage,
        translations,
      },
    } = response;

    const translatedSentences = translations.map(
      ({ beams: [{ postprocessed_sentence: translation }] }) => translation
    );

    let translationsIndex = 0;
    let joinedTranslations = [];

    for (bucketSize of bucketSizes) {
      joinedTranslations.push(
        translatedSentences
          .slice(translationsIndex, translationsIndex + bucketSize)
          .join(' ')
      );

      translationsIndex += bucketSize;
    }

    return {
      targetLanguage,
      resolvedSourceLanguage,
      translation: joinedTranslations.join(EOL),
    };
  } catch (error) {
    throw new Error(
      `Unexpected error when parsing deepl translation response: ${JSON.stringify(
        response
      )}`
    );
  }
}

function transformSplitSentencesResponse(response) {
  try {
    const { result: { splitted_texts: texts } } = response;

    return [
      texts.map(bucket => bucket.length),
      texts.reduce((flattened, current) => [...flattened, ...current], []),
      response.result.lang,
    ];
  } catch (error) {
    throw new Error(
      `Unexpected error when parsing deepl split sentence response: ${JSON.stringify(
        response
      )}`
    );
  }
}

module.exports = {
  translate,
  detectLanguage,
};
