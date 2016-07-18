"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
var InAppBrowser = (function () {
    function InAppBrowser() {
    }
    /**
     * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
     * @param  url     The URL to load.
     * @param  target  The target in which to load the URL, an optional parameter that defaults to _self.
     * @param  options Options for the InAppBrowser. Optional, defaulting to: location=yes.
     *                 The options string must not contain any blank space, and each feature's
     *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
     */
    InAppBrowser.open = function (url, target, options) { return; };
    __decorate([
        plugin_1.Cordova({
            sync: true
        })
    ], InAppBrowser, "open", null);
    InAppBrowser = __decorate([
        plugin_1.Plugin({
            plugin: 'cordova-plugin-inappbrowser',
            pluginRef: 'cordova.InAppBrowser'
        })
    ], InAppBrowser);
    return InAppBrowser;
}());
exports.InAppBrowser = InAppBrowser;
//# sourceMappingURL=inappbrowser.js.map