# deepl-translator

[![Coverage Status](https://coveralls.io/repos/github/vsetka/deepl-translator/badge.svg?branch=master)](https://coveralls.io/github/vsetka/deepl-translator?branch=master)
[![Build Status](https://travis-ci.org/vsetka/deepl-translator.svg?branch=master)](https://travis-ci.org/vsetka/deepl-translator)
[![Known Vulnerabilities](https://snyk.io/test/github/vsetka/deepl-translator/badge.svg)](https://snyk.io/test/github/vsetka/deepl-translator)
[![npm version](https://img.shields.io/npm/v/deepl-translator.svg)](https://www.npmjs.com/package/deepl-translator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)

This unofficial node module provides promised methods for detecting language and translating text using DeepL Translator (https://www.deepl.com/translator) undocumented API.

DeepL has done a great job with their deep learning translation model which outperforms the competition by a wide margin. An excerpt from their page on that topic:

> ## Blind test
> 100 sentences were translated by DeepL Translator, Google Translate, Microsoft Translator, and Facebook. Professional translators assessed the translations, without knowing which system produced which results. The translators preferred our translations over the competition's by a factor of 3:1. Here are the results of a test run in August 2017:

![Stats](https://raw.githubusercontent.com/vsetka/deepl-translator/c0076cf2b7324c310725ea615bf972a6289ffe83/stats.png)

# Supported languages:

| **Language code**   | **Language**
|:--------------------|:---------------------------------------------------------------
| `EN`                | English
| `DE`                | German
| `FR`                | French
| `ES`                | Spanish
| `IT`                | Italian
| `NL`                | Dutch
| `PL`                | Polish

## Install 

```
yarn add deepl-translator
```

This package can also be used on the client since it provides an XHR shim for the HTTP request helper implementation. The shim is defined as a mapping in the `browser` property of the `package.json` so it should be picked up automatically by most of the popular bundlers.

## Usage

```javascript
const { translate, detectLanguage, wordAlternatives, translateWithAlternatives } = require('deepl-translator');

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

// Multi-line translations work as well, even with different source languages mixed in
translate(
  `Das ist der erste Satz... Das der zweite.

  C'est la troisième phrase.


  Y ese es el cuarto.
  I piąta.`,
  'EN'
)
  .then(res => console.log(`Translation: ${res.translation}, Resolved languages: ${res.resolvedSourceLanguage}`))
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
        console.log(`3 Alternative beginnings:`);
        res.alternatives.slice(0, 3).forEach(alt => console.log(alt));
        // Choose the third alternetive
        return res.alternatives[2];
      })
      .then(beginning => {
        // Request translation with selected alternative beginning
        return translateWithAlternatives(text, 'EN', 'DE', beginning);
      })
      .then(res => console.log(`Alternative: ${res.translation}`));
  }
```

## API

### translate(text, targetLanguage, sourceLanguage) -&gt; `object`
This method translates the input text into a specified target language. Source language can be autodetected. Multi-line text translation is possible with
line breaks preserved.

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language. Can be left out or set to `auto` for automatic language detection.*

**Returns**
```javascript
{
  targetLanguage: 'XY', // Language code(s) of the language that was translate to
  resolvedSourceLanguage: 'YZ', // Language code(s) of the input language (resolved automatically for autodetect)
  translation: 'Translated text' // Translated text
}
```

### translateWithAlternatives(text, targetLanguage, sourceLanguage, beginning) -&gt; `object`
This method translates the input text into a specified target language. Source language can be autodetected. Optionally, a sentence beginning override can be given (should be used in conjunction with `wordAlternatives` which gives contextual phrase/word translations).

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language. Can be left out or set to `auto` for automatic language detection.*

**beginning** (`string`) *Override of the translation beginning*

**Returns**
```javascript
{
  targetLanguage: 'XY', // Language code of the language that was translate to
  resolvedSourceLanguage: 'YZ', // Language code of the input language (resolved automatically for autodetect)
  translation: 'Translated text', // Translated text
  translationAlternatives: ['First translated alternative', 'Second translated alternative']
}
```

### detectLanguage(text) -&gt; `object`
This method detects the language of the input text.

**text** (`string`) *Input text to detect the language on*

**Returns**
```javascript
{
  languageCode: 'XY', // Language code of the input text
  languageName: 'Some language', // Language name (in English) of the input text
}
```

### wordAlternatives(text, targetLanguage, sourceLanguage, beginning) -&gt; `object`
This method suggests alternative wordings for a subset of the beginning input text. This means we get alternative translations for the given word or a phrase within a context of the larger body of text (the input `text`). Languages cannot be autodetected.

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language*

**beginning** (`string`) *Subset of the translation of `text` for which the contextual alternatives will be provided*

**Returns**
```javascript
{
  targetLanguage: 'XY', // Language code of the language that was translate to
  resolvedSourceLanguage: 'YZ', // Language code of the input language
  alternatives: ['An alternative', 'Yet another alternative'], // Array of alternative sentence beginnings
}
```

## License

Apache License 2.0
