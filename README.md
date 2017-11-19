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

## Usage

```javascript
const { translate, detectLanguage } = require('deepl-translator');

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

  // Get alternatives for words in translated sentences
  {
    const text = 'Die Übersetzungsqualität von deepl ist erstaunlich!';
    // Translates to: 'The translation quality of deepl is amazing!'
    wordAlternatives(text, 'EN', 'DE', 'The translation')
      .then(res => {
        console.log(`3 Alternative beginnings:`);
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
```

## API

### translate(text, targetLanguage, sourceLanguage, beginning) -&gt; `object`
This method translates the input text into a specified target language. Source language can be autodetected. Optionally, a sentence beginning can be given (should only be used in conjunction with `wordAlternatives`).

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language. Can be left out or set to `auto` for automatic language detection.*

**beginning** (`string`) *Desired beginning of the translation (should only be used in conjunction with `wordAlternatives`)*

**Returns**
```javascript
{
  targetLanguage: 'XY', // Language code of the language that was translate to
  resolvedSourceLanguage: 'YZ', // Language code of the input language (resolved automatically for autodetect)
  translation: 'Translated text' // Translated text
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
This method suggests alternative words for a translation of the input text. None of the languages can be autodetected. Normally, this method will be used after translating the input text using `translate`, because `beginning` must be the beginning of a translation.

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language*

**beginning** (`string`) *Beginning of the translation of `text`. The method searches an alternative for the following word.*

**Returns**
```javascript
{
  targetLanguage: 'XY', // Language code of the language that was translate to
  resolvedSourceLanguage: 'YZ', // Language code of the input language
  alternatives: ['an alternative', 'an other alternative'], // Array of alternative sentence beginnings
}
```

## License

Apache License 2.0
