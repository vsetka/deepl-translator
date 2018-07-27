#### 1.2.1 (2018-07-27)

##### Bug Fixes

*  Update deepl API ([#8](https://github.com/vsetka/deepl-translator/pull/8)) ([5e7f1c3c](https://github.com/vsetka/deepl-translator/commit/5e7f1c3c08abd6e49323d40990f0738b16238983))

### 1.2.0 (2017-11-19)

##### Chores

* add more keywords for better discoverability ([e6d4169d](https://github.com/vsetka/deepl-translator/commit/e6d4169d28a387ab6534fdf15a271f6b7f60e576))
* update tests, mocks, examples and docs ([986c442a](https://github.com/vsetka/deepl-translator/commit/986c442af7b919a71fd1b719646c934ca214ea3f))
* update badges ([735f7c2d](https://github.com/vsetka/deepl-translator/commit/735f7c2d8ebda709545ee330d8818e6129b2f886))
* create issue and pull request templates ([0080dd23](https://github.com/vsetka/deepl-translator/commit/0080dd23fde3229433df62dc24eda9ab85b96db2))

##### New Features

* shim http request implementation to support front-end use ([6bd22620](https://github.com/vsetka/deepl-translator/commit/6bd22620a4785cca2806c329614614a4f26248b1))
* add a method that gets alternative translations for shorter texts ([b482ed55](https://github.com/vsetka/deepl-translator/commit/b482ed557816941e55935581f01de42642a848fd))
* add support to use deepl's word-alternative API ([40148fa9](https://github.com/vsetka/deepl-translator/commit/40148fa9f42ad5e640e018d5ec8c702f63ae3408))

##### Bug Fixes

* process response fully before parsing it to JSON ([ea42c3d9](https://github.com/vsetka/deepl-translator/commit/ea42c3d9922f43dfbb5b886a3bb991be7955aac3))

##### Refactors

* use the lightweight translation method in wordAlternatives ([5c8cc760](https://github.com/vsetka/deepl-translator/commit/5c8cc76015ad0b0cb6228c878c3b87af001f53c6))
* implement more granular parameter validation ([fba8517e](https://github.com/vsetka/deepl-translator/commit/fba8517e1a259c39a228b50a9681ee1ad8836fcd))

### 1.1.0 (2017-10-01)

##### Chores

* add changelog ([7a37b153](https://github.com/vsetka/deepl-translator/commit/7a37b153822d419339bfede3dad5ba41ddb43cdc))
* update tests, mocks, examples and docs ([3d697a42](https://github.com/vsetka/deepl-translator/commit/3d697a42c4869f6029eacf9a6f233e093a47897f))

##### New Features

* respect paragraph formatting in multi-line translations ([aa546064](https://github.com/vsetka/deepl-translator/commit/aa5460645d7b25f32e77b2607cd370eeb80a246f))
* add multi-line text support ([3a7333bd](https://github.com/vsetka/deepl-translator/commit/3a7333bdda6512d1c16ee63cc6b486832e116b86))

##### Refactors

* reorganize structure ([7bc9a427](https://github.com/vsetka/deepl-translator/commit/7bc9a42798b355df891e686a7c3640ee8576a8a8))

### 1.0.1 (2017-09-10)

##### Chores

* bump patch ([a0c56a19](https://github.com/vsetka/deepl-translator/commit/a0c56a19e61c226a215e96db7d72cfae47badb4e))
* add prettier and enforce it in tests ([50455842](https://github.com/vsetka/deepl-translator/commit/5045584282dde450c4f4ebc95c2ef8755710ad06))
* update README example ([549b5e68](https://github.com/vsetka/deepl-translator/commit/549b5e684843ce45da9c95b54358feaf32f3e9de))
* create an .npmignore file [ci skip] ([91d0a027](https://github.com/vsetka/deepl-translator/commit/91d0a027b2d6f3a263b42607025ceeb1cd915b75))
* update README.md [ci skip] ([5c5d6d0c](https://github.com/vsetka/deepl-translator/commit/5c5d6d0c5b4712db66034981937db16f15097467))
* run coverage and push to coveralls ([5710ba61](https://github.com/vsetka/deepl-translator/commit/5710ba617392306cfa25d1377cdffcbb697dcb3a))
* configure travis ci ([964e5548](https://github.com/vsetka/deepl-translator/commit/964e55488557e0d53abca548ab810eb5785e74be))

##### Bug Fixes

* update registry url in yarn.lock ([44a6a0a7](https://github.com/vsetka/deepl-translator/commit/44a6a0a7c04d80393bc436f94c06a67353349485))

### 1.0.0 (2017-09-10)

##### Chores

* add coverage script to package.json ([83f679d2](https://github.com/vsetka/deepl-translator/commit/83f679d2768b8909120add57653c1d3b1f4319d5))
* commit yarn.lock ([acf16bbd](https://github.com/vsetka/deepl-translator/commit/acf16bbd1b110671d56f980b9c742ceb44d4f256))
* add .vscode launch configs to .gitignore ([e1e59f60](https://github.com/vsetka/deepl-translator/commit/e1e59f60f4edf4fee7c4c0b57048535ad673d889))
* add an example with input auto detect ([7f601b8e](https://github.com/vsetka/deepl-translator/commit/7f601b8e43604ea6f5ef99887a413771334b8b41))
* write docs ([0962743d](https://github.com/vsetka/deepl-translator/commit/0962743d42285eeb0b5431b6251b18ebaa96699f))
* create initial README ([a821ed9b](https://github.com/vsetka/deepl-translator/commit/a821ed9b11a10063a4e789d1de76e83c608fc00b))

##### New Features

* first verison ([fa31d5d3](https://github.com/vsetka/deepl-translator/commit/fa31d5d318ebf9057d60946e9dbf6fe216089fbc))

##### Other Changes

* write unit tests ([b3d2b3ee](https://github.com/vsetka/deepl-translator/commit/b3d2b3ee1aba0696829935f9f477cc9542940959))

##### Refactors

* extract request logic into a helper module for easier mocking ([21050e32](https://github.com/vsetka/deepl-translator/commit/21050e32b0c6ab37624421af7122a4ad3a964caf))

