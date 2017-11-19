const languages = require('./languages');
const {
  splitSentences,
  getTranslation,
  getAlternatives,
} = require('./deepl-api-helper');
const { EOL } = require('os');

function detectLanguage(text) {
  return translate(text, 'EN').then(({ resolvedSourceLanguage }) => {
    return {
      languageCode: resolvedSourceLanguage,
      languageName: resolvedSourceLanguage
        .split(',')
        .map(code => languages[code])
        .join(','),
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

function validateBeginning(beginning) {
  return new Promise((resolve, reject) => {
    if (beginning == undefined) {
      reject(new Error(`Beginning cannot be undefined`));
    } else {
      resolve(true);
    }
  });
}

function translate(
  text,
  targetLanguage,
  sourceLanguage = 'auto',
  beginning = ''
) {
  return validateInputs(text, targetLanguage, sourceLanguage)
    .then(valid => splitSentences(text.split(EOL), sourceLanguage))
    .then(transformSplitSentencesResponse)
    .then(([paragraphs, resolvedSourceLanguage]) => {
      return Promise.all(
        paragraphs.map(
          paragraph =>
            paragraph.length === 0
              ? []
              : getTranslation(
                  paragraph,
                  targetLanguage,
                  resolvedSourceLanguage || 'auto',
                  beginning
                ).then(transformTranslationResponse)
        )
      ).then(translatedParagraphs => ({
        targetLanguage,
        resolvedSourceLanguage: translatedParagraphs
          .map(paragraph => paragraph[1])
          .reduce(
            (unique, current) => [
              ...unique,
              unique.indexOf(current) < 0 && current,
            ],
            []
          )
          .filter(lang => lang)
          .join(','),
        translation: translatedParagraphs
          .map(([paragraph]) => paragraph || '')
          .join(EOL),
      }));
    });
}

function wordAlternatives(text, targetLanguage, sourceLanguage, beginning) {
  return validateInputs(text, targetLanguage, sourceLanguage)
    .then(valid => validateBeginning(beginning))
    .then(valid =>
      getAlternatives(text, targetLanguage, sourceLanguage, beginning)
    )
    .then(res => {
      return {
        targetLanguage: res.result.target_lang,
        resolvedSourceLanguage: res.result.source_lang,
        alternatives: res.result.translations[0].beams.map(alt => {
          return alt.postprocessed_sentence;
        }),
      };
    });
}

function transformTranslationResponse(response) {
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

    return [translatedSentences.join(' '), resolvedSourceLanguage];
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
    const {
      result: { splitted_texts: texts, lang_is_confident, lang },
    } = response;

    return [texts, lang_is_confident && lang];
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
  wordAlternatives,
};
