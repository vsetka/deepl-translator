# deepl-translator

This module provides promised methods for detecting language and translating text using DeepL Translator (https://www.deepl.com/translator) undocumented API.

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
const { translate, detectLanguage } = require('./index');

// Translate text with explicit source and target languages
translate('Die Übersetzungsqualität von deepl ist erstaunlich!', 'EN', 'DE')
  .then(res => console.log(`Translation: ${res.translation}`))
  .catch(console.error);

// Leave out the source language or specify 'auto' to autodetect the input
translate('Die Übersetzungsqualität von deepl ist erstaunlich!', 'EN')
  .then(res => console.log(`Translation (autodetect): ${res.translation}`))
  .catch(console.error);

// Detect the text language without giving back the translation
detectLanguage('Deepl también puede detectar un idioma. ¿Qué idioma es este?')
  .then(res => console.log(`Detected language: ${res.languageName}`))
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
