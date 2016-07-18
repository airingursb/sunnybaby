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
export declare class Translate {
    private _transMap;
    private _language;
    translations(lang: any, map: any): void;
    setLanguage(lang: any): void;
    getTranslations(lang: any): any;
    translate(key: any, lang: any): any;
    _getTranslation(map: any, key: any): any;
}
