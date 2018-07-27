const { getTranslation, splitSentences } = require('../src/deepl-api-helper');

jest.setTimeout(30000);

test('Splits sentences correctly', () => {
  return splitSentences(['Split me, please. Yours truly, the sentence.'], 'EN')
    .then(response => expect(response).toMatchSnapshot())
    .catch(() => fail());
});

test('Gets a correct translation', () => {
  return getTranslation(['Translate me, please.'], 'DE', 'EN')
    .then(response =>
      expect(response).toMatchSnapshot({
        id: expect.any(Number),
        jsonrpc: '2.0',
        result: {
          date: expect.any(String),
          source_lang: 'EN',
          source_lang_is_confident: expect.any(Number),
          target_lang: 'DE',
          timestamp: expect.any(Number),
          translations: [
            {
              beams: [
                {
                  num_symbols: expect.any(Number),
                  postprocessed_sentence: expect.any(String),
                  score: expect.any(Number),
                  totalLogProb: expect.any(Number),
                },
                {
                  num_symbols: expect.any(Number),
                  postprocessed_sentence: expect.any(String),
                  score: expect.any(Number),
                  totalLogProb: expect.any(Number),
                },
                {
                  num_symbols: expect.any(Number),
                  postprocessed_sentence: expect.any(String),
                  score: expect.any(Number),
                  totalLogProb: expect.any(Number),
                },
                {
                  num_symbols: expect.any(Number),
                  postprocessed_sentence: expect.any(String),
                  score: expect.any(Number),
                  totalLogProb: expect.any(Number),
                },
                {
                  num_symbols: expect.any(Number),
                  postprocessed_sentence: expect.any(String),
                  score: expect.any(Number),
                  totalLogProb: expect.any(Number),
                },
              ],
              timeAfterPreprocessing: expect.any(Number),
              timeReceivedFromEndpoint: expect.any(Number),
              timeSentToEndpoint: expect.any(Number),
              total_time_endpoint: expect.any(Number),
            },
          ],
        },
      })
    )
    .catch(() => fail());
});
