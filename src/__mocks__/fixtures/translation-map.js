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
              postprocessed_sentence:
                'The translation quality of deepl is amazing!',
            },
          ],
        },
      ],
    },
  },

  'Das ist der erste Satz...': {
    result: {
      source_lang: 'DE',
      target_lang: 'EN',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence: "That's the first sentence...",
            },
          ],
        },
        {
          beams: [
            {
              postprocessed_sentence: "That's the second one.",
            },
          ],
        },
      ],
    },
  },

  "  C'est la troisième phrase.": {
    result: {
      source_lang: 'FR',
      target_lang: 'EN',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence: "That's the third sentence.",
            },
          ],
        },
      ],
    },
  },

  '  Y ese es el cuarto.': {
    result: {
      source_lang: 'ES',
      target_lang: 'EN',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence: "And that's the fourth.",
            },
          ],
        },
      ],
    },
  },

  '  I piąta.': {
    result: {
      source_lang: 'PL',
      target_lang: 'EN',
      translations: [
        {
          beams: [
            {
              postprocessed_sentence: 'Fifth.',
            },
          ],
        },
      ],
    },
  },
};
