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
    result: {
      no_splits_here: [],
    },
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
};
