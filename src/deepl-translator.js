const languages = require('./languages');
const {
  validateText,
  validateSourceLanguage,
  validateTargetLanguage,
  validateSourceTargetLanguage,
  validateBeginning,
} = require('./validators');

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

function validateInputs(validationArray) {
  return Promise.all(validationArray).then(validationResults => {
    const errors = validationResults
      .filter(validationResult => validationResult)
      .join('\n');

    return errors.length
      ? Promise.reject(
          new Error(
            `Input parameter validation failed with error(s): ${errors}`
          )
        )
      : Promise.resolve('');
  });
}

function translate(text, targetLanguage, sourceLanguage = 'auto') {
  return validateInputs([
    validateText(text),
    validateSourceLanguage(sourceLanguage),
    validateTargetLanguage(targetLanguage),
    validateSourceTargetLanguage(sourceLanguage, targetLanguage),
  ])
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
                  resolvedSourceLanguage || 'auto'
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

function translateWithAlternatives(
  text,
  targetLanguage,
  sourceLanguage = 'auto',
  beginning
) {
  return validateInputs([
    validateText(text),
    validateSourceLanguage(sourceLanguage),
    validateTargetLanguage(targetLanguage),
    validateSourceTargetLanguage(sourceLanguage, targetLanguage),
  ])
    .then(valid =>
      getTranslation([text], targetLanguage, sourceLanguage, beginning)
    )
    .then(({ result: { source_lang, translations: [{ beams }] } }) => ({
      targetLanguage,
      resolvedSourceLanguage: source_lang,
      translation: beams[0].postprocessed_sentence,
      translationAlternatives: beams.map(
        ({ postprocessed_sentence }) => postprocessed_sentence
      ),
    }));
}

function wordAlternatives(text, targetLanguage, sourceLanguage, beginning) {
  return validateInputs([
    validateText(text),
    validateSourceLanguage(sourceLanguage),
    validateTargetLanguage(targetLanguage),
    validateSourceTargetLanguage(sourceLanguage, targetLanguage),
    validateBeginning(beginning),
  ])
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
  translateWithAlternatives,
  detectLanguage,
  wordAlternatives,
};
