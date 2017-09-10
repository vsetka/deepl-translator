jest.mock('../request-helper');

const { translate, detectLanguage } = require('../index');

test('Detects english input language correctly', () => {
  return expect(
    detectLanguage('This is a representative chunk of text in english.')
  ).resolves.toEqual({
    languageCode: 'EN',
    languageName: 'English',
  });
});

test('Translate input correctly without specifying its language', () => {
  return expect(translate('Happy birthday!', 'DE')).resolves.toEqual({
    targetLanguage: 'DE',
    resolvedSourceLanguage: 'EN',
    translation: 'Herzlichen Glückwunsch zum Geburtstag!',
  });
});

test('Rejects on invalid target language', () => {
  return expect(translate('Happy birthday!')).rejects.toEqual(
    new Error('Invalid target language code undefined')
  );
});

test('Rejects on invalid source language', () => {
  return expect(translate('Happy birthday!', 'DE', 'XX')).rejects.toEqual(
    new Error('Invalid source language code XX')
  );
});

test('Rejects when source and target languages are identical', () => {
  return expect(translate('Happy birthday!', 'DE', 'DE')).rejects.toEqual(
    new Error('Target and source language codes identical')
  );
});

test('Rejects when input text is not provided', () => {
  return expect(translate('', 'DE')).rejects.toEqual(
    new Error('Must provide text for translation')
  );
});

test('Rejects when response in incorrect format', () => {
  return expect(
    translate('This mock results in an incorrect reponse format', 'DE')
  ).rejects.toEqual(
    new Error(
      'Unexpected error when parsing response body: {"result":{"no_translations_here":[]}}'
    )
  );
});
