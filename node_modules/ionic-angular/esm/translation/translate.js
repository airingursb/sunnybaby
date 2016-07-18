var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @private
 * Provide multi-language and i18n support in your app. Translate works by
 * mapping full strings to language translated ones. That means that you don't
 * need to provide strings for your default language, just new languages.
 *
 * Note: The Angular team will be building an
 * [Localization/Internationalization](https://docs.google.com/document/d/1mwyOFsAD-bPoXTk3Hthq0CAcGXCUw-BtTJMR4nGTY-0/view#heading=h.ixg45w3363q)
 * provider, so this Translation provider may not be further developed.
 *
 * @usage
 * ```js
 * Translate.translations({
 *   'de': {
 *     'Welcome to MyApp': 'Willkommen auf'
 *   }
 * })
 *
 * Changing the default language:
 *
 * Translate.setLanguage('de');
 * ```
 *
 * Usage in a template:
 *
 * ```js
 * <span>{{ 'Welcome to MyApp' | translate }}
 * ```
 */
export var Translate = function () {
    function Translate() {
        _classCallCheck(this, Translate);

        this._transMap = {};
        this._language = {};
    }

    _createClass(Translate, [{
        key: 'translations',
        value: function translations(lang, map) {
            this._transMap[lang] = map;
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this._language = lang;
        }
    }, {
        key: 'getTranslations',
        value: function getTranslations(lang) {
            return this._transMap[lang];
        }
    }, {
        key: 'translate',
        value: function translate(key, lang) {
            // If the language isn't specified and we have no overridden one, return the string passed.
            if (!lang && !this._language) {
                return key;
            }
            var setLanguage = lang || this._language;
            var map = this.getTranslations(setLanguage);
            if (!map) {
                console.warn('I18N: No translation for key', key, 'using language', setLanguage);
                return '';
            }
            return this._getTranslation(map, key);
        }
    }, {
        key: '_getTranslation',
        value: function _getTranslation(map, key) {
            return map && map[key] || '';
        }
    }]);

    return Translate;
}();