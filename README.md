# deepl-translator

[![Coverage Status](https://coveralls.io/repos/github/vsetka/deepl-translator/badge.svg?branch=master)](https://coveralls.io/github/vsetka/deepl-translator?branch=master)
[![Build Status](https://travis-ci.org/vsetka/deepl-translator.svg?branch=master)](https://travis-ci.org/vsetka/deepl-translator)
[![Known Vulnerabilities](https://snyk.io/test/github/vsetka/deepl-translator/badge.svg)](https://snyk.io/test/github/vsetka/deepl-translator)

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

// Multi-line translations work as well
translate(
  `Das ist der erste Satz. Das der zweite.

  Das der dritte.


  Und das der vierte.
  Und fünfte.`,
  'EN'
)
  .then(res => console.log(`Translation: ${res.translation}`))
  .catch(console.error);
```

## API

### translate(text, targetLanguage, sourceLanguage) -&gt; `object`
This method translated the input text into a specified target language. Source language can be autodetected.

**text** (`string`) *Input text to be translated*

**targetLanguage** (`string`) *Language code of the language to translate to*

**sourceLanguage** (`string`) *Language code of the input text language. Can be left out or set to `auto` for automatic language detection.*

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

**text** (`string`) *Input text to detect the language of*

**Returns**
```javascript
{
  languageCode: 'XY', // Language code of the input text
  languageName: 'Some language', // Language name (in English) of the input text
}
```

## License

Apache License 2.0
