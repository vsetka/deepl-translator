const {
  translate,
  detectLanguage,
  wordAlternatives,
  translateWithAlternatives,
} = require('./index');

// Translate text with explicit source and target languages
translate('Die Übersetzungsqualität von deepl ist erstaunlich!', 'EN', 'DE')
  .then(res => console.log(`Translation: ${res.translation}`))
  .catch(console.error);

// Translate short text with this method to get a few translation alternatives
translateWithAlternatives(
  'Die Übersetzungsqualität von deepl ist erstaunlich!',
  'EN'
)
  .then(res =>
    console.log(
      `Translation alternatives: ${res.translationAlternatives.join(', ')}`
    )
  )
  .catch(console.error);

// Leave out the source language or specify 'auto' to autodetect the input
translate('This is a representative chunk of text in english.', 'DE')
  .then(res => console.log(`Translation: ${res.translation}`))
  .catch(console.error);

// Detect the text language without giving back the translation
detectLanguage('Deepl también puede detectar un idioma. ¿Qué idioma es este?')
  .then(res => console.log(`Detected language: ${res.languageName}`))
  .catch(console.error);

// Multi-line translations with different languages in each paragraph work as well
translate(
  `Das ist der erste Satz... Das der zweite.

  C'est la troisième phrase.


  Y ese es el cuarto.
  I piąta.`,
  'EN'
)
  .then(res => console.log(`Translation: ${res.translation}`))
  .catch(console.error);

// This method allows for tweaking the translation. By providing a beginning, we define a word or a phrase
// for which we want alternative translations within the context of a larger body of text (a sentence).
// One of the returned alternatives can then be selected and passed into translateWithAlternatives
// as an overriding word/phrase for the beginning of the whole translation.
{
  const text = 'Die Übersetzungsqualität von deepl ist erstaunlich!';
  // Translates to: 'The translation quality of deepl is amazing!'
  wordAlternatives(text, 'EN', 'DE', 'The translation')
    .then(res => {
      console.log(`Alternative beginnings:`);
      res.alternatives.slice(0, 3).forEach(el => console.log(el));
      // Choose the third alternetive
      return res.alternatives[2];
    })
    .then(beginning => {
      // Request translation with selected alternative beginning
      return translateWithAlternatives(text, 'EN', 'DE', beginning);
    })
    .then(res => console.log(`Alternative: ${res.translation}`));
}
