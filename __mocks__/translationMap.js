module.exports = {
  'Happy birthday!': {
    result: {
      source_lang: 'EN',
      target_lang: 'DE',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence: 'Herzlichen Glückwunsch zum Geburtstag!',
            },
          ],
        },
      ],
    },
  },
  'This is a representative chunk of text in english.': {
    result: {
      source_lang: 'EN',
      target_lang: 'DE',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence:
                'This is a representative chunk of text in english.',
            },
          ],
        },
      ],
    },
  },
  'This mock results in an incorrect reponse format': {
    result: {
      no_translations_here: [],
    },
  },
};
