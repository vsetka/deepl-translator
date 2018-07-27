const { getTranslation, splitSentences } = require('../src/deepl-api-helper');

jest.setTimeout(30000);

test('Splits sentences correctly', async () => {
  try {
    const response = await splitSentences(
      ['Split me, please. Yours truly, the sentence.'],
      'EN'
    );

    expect(response).toMatchSnapshot();
  } catch (e) {
    fail();
  }
});

test('Gets a correct translation', async () => {
  try {
    const response = await getTranslation(
      ['Translate me, please.'],
      'DE',
      'EN'
    );
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
    });
  } catch (e) {
    fail();
  }
});
