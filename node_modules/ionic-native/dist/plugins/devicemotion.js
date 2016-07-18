"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Device Motion
 * @description
 * Requires Cordova plugin: `cordova-plugin-device-motion`. For more info, please see the [Device Motion docs](https://github.com/apache/cordova-plugin-device-motion).
 *
 * @usage
 * ```ts
 * import {DeviceMotion} from 'ionic-native';
 *
 *
 *
 * // Get the device current acceleration
 * DeviceMotion.getCurrentAcceleration().then(
 *   acceleration => console.log(acceleration),
 *   error => console.log(error)
 * );
 *
 * // Watch device acceleration
 * var subscription = DeviceMotion.watchAcceleration().subscribe(acceleration => {
 *   console.log(acceleration);
 * });
 *
 * // Stop watch
 * subscription.unsubscribe();
 *
 * ```
 */
var DeviceMotion = (function () {
    function DeviceMotion() {
    }
    /**
     * Get the current acceleration along the x, y, and z axes.
     *
     * @returns {Promise<any>} Returns object with x, y, z, and timestamp properties
     */
    DeviceMotion.getCurrentAcceleration = function () {
        return;
    };
    /**
     * Watch the device acceleration. Clear the watch by unsubscribing from the observable.
     *
     * ```ts
     * // Watch device acceleration
     * var subscription = DeviceMotion.watchPosition().subscribe(acceleration => {
     *   console.log(acceleration);
     * });
     *
     * // Stop watch
     * subscription.unsubscribe();
     * ```
     * @param options
     * @returns {Observable<AccelerationData>}
     */
    DeviceMotion.watchAcceleration = function (options) {
        return;
    };
    __decorate([
        plugin_1.Cordova()
    ], DeviceMotion, "getCurrentAcceleration", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse',
            observable: true,
            clearFunction: 'clearWatch'
        })
    ], DeviceMotion, "watchAcceleration", null);
    DeviceMotion = __decorate([
        plugin_1.Plugin({
            plugin: 'cordova-plugin-device-motion',
            pluginRef: 'navigator.accelerometer',
            repo: 'https://github.com/apache/cordova-plugin-device-motion'
        })
    ], DeviceMotion);
    return DeviceMotion;
}());
exports.DeviceMotion = DeviceMotion;
//# sourceMappingURL=devicemotion.js.map