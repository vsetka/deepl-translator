const languages = require('./languages');

module.exports = {
  validateText: text =>
    Promise.resolve(
      (typeof text !== 'string' || text.trim().length === 0) &&
        'Must provide valid text for translation'
    ),
  validateTargetLanguage: targetLanguage =>
    Promise.resolve(
      !languages[targetLanguage] &&
        `Invalid target language code ${targetLanguage}`
    ),
  validateSourceLanguage: sourceLanguage =>
    Promise.resolve(
      sourceLanguage !== 'auto' &&
        !languages[sourceLanguage] &&
        `Invalid source language code ${sourceLanguage}`
    ),
  validateSourceTargetLanguage: (sourceLanguage, targetLanguage) =>
    Promise.resolve(
      targetLanguage === sourceLanguage &&
        `Target and source language codes identical`
    ),
  validateBeginning: beginning =>
    Promise.resolve(
      !beginning && `Must provide valid text for beginning translation override`
    ),
};
