module.exports = {
  'This is a representative chunk of text in english.': {
    id: 1,
    jsonrpc: '2.0',
    result: {
      lang: 'EN',
      lang_is_confident: 1,
      splitted_texts: [['This is a representative chunk of text in english.']],
    },
  },

  'Happy birthday!': {
    id: 1,
    jsonrpc: '2.0',
    result: {
      lang: 'EN',
      lang_is_confident: 1,
      splitted_texts: [['Happy birthday!']],
    },
  },

  'This mock results in an incorrect split reponse format': {
    invalid_response: {},
  },

  'This mock results in an incorrect translation reponse format': {
    id: 1,
    jsonrpc: '2.0',
    result: {
      lang: 'EN',
      lang_is_confident: 1,
      splitted_texts: [
        ['This mock results in an incorrect translation reponse format'],
      ],
    },
  },

  'Das ist der erste Satz... Das der zweite.': {
    id: 1,
    jsonrpc: '2.0',
    result: {
      lang: 'DE',
      lang_is_confident: 0,
      splitted_texts: [
        ['Das ist der erste Satz...', 'Das der zweite.'],
        [],
        ["  C'est la troisième phrase."],
        [],
        [],
        ['  Y ese es el cuarto.'],
        ['  I piąta.'],
      ],
    },
  },

  'Die Übersetzungsqualität von deepl ist erstaunlich!': {
    id: 1,
    jsonrpc: '2.0',
    result: {
      lang: 'DE',
      lang_is_confident: 1,
      splitted_texts: [['Die Übersetzungsqualität von deepl ist erstaunlich!']],
    },
  },
};
