jest.mock('../src/request-helper');

const {
  translate,
  detectLanguage,
  wordAlternatives,
  translateWithAlternatives,
} = require('../src/deepl-translator');

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

test('Translate multi-line multi-language text while keeping paragraph structure', () => {
  return expect(
    translate(
      `Das ist der erste Satz... Das der zweite.
  
      C'est la troisième phrase.
    
    
      Y ese es el cuarto.
      I piąta.`,
      'EN'
    )
  ).resolves.toEqual({
    resolvedSourceLanguage: 'DE,FR,ES,PL',
    targetLanguage: 'EN',
    translation: `That's the first sentence... That's the second one.

That's the third sentence.


And that's the fourth.
Fifth.`,
  });
});

test('Create translation with a fixed beginning', () => {
  return expect(
    translate(
      'Die Übersetzungsqualität von deepl ist erstaunlich!',
      'EN',
      'DE',
      'The translation performance'
    )
  ).resolves.toEqual({
    resolvedSourceLanguage: 'DE',
    targetLanguage: 'EN',
    translation: 'The translation performance of deepl is amazing!',
  });
});

test('Rejects on invalid target language', () => {
  return expect(translate('Happy birthday!')).rejects.toEqual(
    new Error(
      'Input parameter validation failed with error(s): Invalid target language code undefined'
    )
  );
});

test('Rejects on invalid source language', () => {
  return expect(translate('Happy birthday!', 'DE', 'XX')).rejects.toEqual(
    new Error(
      'Input parameter validation failed with error(s): Invalid source language code XX'
    )
  );
});

test('Rejects when source and target languages are identical', () => {
  return expect(translate('Happy birthday!', 'DE', 'DE')).rejects.toEqual(
    new Error(
      'Input parameter validation failed with error(s): Target and source language codes identical'
    )
  );
});

test('Rejects when input text is not provided', () => {
  return expect(translate('', 'DE')).rejects.toEqual(
    new Error(
      'Input parameter validation failed with error(s): Must provide valid text for translation'
    )
  );
});

test('Rejects when translation response in incorrect format', () => {
  return expect(
    translate(
      'This mock results in an incorrect translation reponse format',
      'DE'
    )
  ).rejects.toEqual(
    new Error(
      'Unexpected error when parsing deepl translation response: {"result":{"no_translations_here":[]}}'
    )
  );
});

test('Rejects when split response in incorrect format', () => {
  return expect(
    translate('This mock results in an incorrect split reponse format', 'DE')
  ).rejects.toEqual(
    new Error(
      'Unexpected error when parsing deepl split sentence response: {"invalid_response":{}}'
    )
  );
});

test('Get alternative beginnings of a sentence', () => {
  const text = 'Die Übersetzungsqualität von deepl ist erstaunlich!';
  // Translates to: 'The translation quality of deepl is amazing!'
  return expect(
    wordAlternatives(text, 'EN', 'auto', 'The translation')
  ).resolves.toEqual({
    targetLanguage: 'EN',
    resolvedSourceLanguage: 'DE',
    alternatives: [
      'The translation quality',
      'The translation of deepl',
      'The translation performance',
    ],
  });
});

test('Rejects when requesting alternative beginning without beginning', () => {
  return expect(
    wordAlternatives(
      'Die Übersetzungsqualität von deepl ist erstaunlich!',
      'EN',
      'DE'
    )
  ).rejects.toEqual(
    new Error(
      'Input parameter validation failed with error(s): Must provide valid text for beginning translation override'
    )
  );
});

test('Translate short text to a few translation alternatives', () => {
  return expect(
    translateWithAlternatives(
      'Die Übersetzungsqualität von deepl ist erstaunlich!',
      'EN'
    )
  ).resolves.toEqual({
    targetLanguage: 'EN',
    resolvedSourceLanguage: 'DE',
    translation: 'The translation quality of deepl is amazing!',
    translationAlternatives: [
      'The translation quality of deepl is amazing!',
      "deepl's translation quality is amazing!",
      'The translation quality of deepl is astonishing!',
      'The translation quality of deepl is astounding!',
    ],
  });
});
