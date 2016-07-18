"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Launch Navigator
 * @description
 * Requires Cordova plugin: uk.co.workingedge.phonegap.plugin.launchnavigator. For more info, please see the [LaunchNavigator plugin docs](https://github.com/dpa99c/phonegap-launch-navigator).
 *
 * @usage
 * ```js
 * import {LaunchNavigator} from 'ionic-native';
 *
 *
 *
 * LaunchNavigator.navigate("Toronto, ON", "London, ON")
 *   .then(
 *     success => console.log("Launched navigator"),
 *     error => console.log("Error launching navigator", error)
 *   );
 * ```
 */
var LaunchNavigator = (function () {
    function LaunchNavigator() {
    }
    /**
     * Launches navigator app
     * @param destination Location name or coordinates
     * @param start Location name or coordinates
     * @param options
     * @returns {Promise<any>}
     */
    LaunchNavigator.navigate = function (destination, start, options) {
        if (start === void 0) { start = null; }
        return;
    };
    __decorate([
        plugin_1.Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], LaunchNavigator, "navigate", null);
    LaunchNavigator = __decorate([
        plugin_1.Plugin({
            plugin: 'uk.co.workingedge.phonegap.plugin.launchnavigator',
            pluginRef: 'launchnavigator',
            repo: 'https://github.com/dpa99c/phonegap-launch-navigator.git'
        })
    ], LaunchNavigator);
    return LaunchNavigator;
}());
exports.LaunchNavigator = LaunchNavigator;
//# sourceMappingURL=launchnavigator.js.map