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
      target_lang: 'EN',
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

  'This mock results in an incorrect translation reponse format': {
    result: {
      no_translations_here: [],
    },
  },

  'Die Übersetzungsqualität von deepl ist erstaunlich!': {
    result: {
      source_lang: 'DE',
      target_lang: 'EN',
      translations: [
        {
          beams: [
            {
              num_symbols: 11,
              postprocessed_sentence:
                'The translation quality of deepl is amazing!',
              score: -5001.03,
              totalLogProb: -3.41658,
            },
          ],
        },
      ],
    },
  },
};
