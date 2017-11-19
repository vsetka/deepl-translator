const { translate, detectLanguage, wordAlternatives } = require('./index');

// Translate text with explicit source and target languages
translate('Die Übersetzungsqualität von deepl ist erstaunlich!', 'EN', 'DE')
  .then(res => console.log(`Translation: ${res.translation}`))
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

// Request alternative translations for a single word
{
  const text = 'Die Übersetzungsqualität von deepl ist erstaunlich!';
  // Translates to: 'The translation quality of deepl is amazing!'
  wordAlternatives(text, 'EN', 'DE', 'The translation')
    .then(res => {
      console.log(`Alternative beginnings:`);
      res.alternatives.slice(0, 3).forEach(el => console.log(el));
      // Choose third alternetive
      return res.alternatives[2];
    })
    .then(beginning => {
      // Request translation with selected alternative beginning
      return translate(text, 'EN', 'DE', beginning);
    })
    .then(res => console.log(`Alternative: ${res.translation}`));
}
