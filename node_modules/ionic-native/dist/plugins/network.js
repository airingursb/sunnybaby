"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Network
 * @description
 * Requires Cordova plugin: cordova-plugin-network-information. For more info, please see the [Network plugin docs](https://github.com/apache/cordova-plugin-network-information).
 *
 * @usage
 * ```js
 * import {Network, Connection} from 'ionic-native';
 *
 * // watch network for a disconnect
 * let disconnectSubscription = Network.onDisconnect().subscribe(() => {
 *   console.log('network was disconnected :-( ')
 * });
 *
 * // stop disconnect watch
 * disconnectSubscription.unsubscribe();
 *
 *
 * // watch network for a connection
 * let connectSubscription = Network.onConnect().subscribe(() => {
 *   console.log('network connected!');
*
 *   // We just got a connection but we need to wait briefly
 *
// before we determine the connection type.  Might need to wait

 *   // prior to doing any api requests as well.
 *   setTimeout(() => {
 *     console.log(Network.connection);
 *     if (Network.connection === Connection.WIFI) {
 *       console.log('we got a wifi connection, woohoo!');
 *     }
 *   }, 3000);
 * });
 *
 * // stop connect watch
 * connectSubscription.unsubscribe();
 *
 * ```
 */
var Network = (function () {
    function Network() {
    }
    Object.defineProperty(Network, "connection", {
        /**
         * Return the network connection type
         */
        get: function () { return navigator.connection.type; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get notified when the device goes offline
     * @returns {Observable<any>} Returns an observable.
     */
    Network.onDisconnect = function () { return; };
    /**
     * Get notified when the device goes online
     * @returns {Observable<any>} Returns an observable.
     */
    Network.onConnect = function () { return; };
    __decorate([
        plugin_1.CordovaProperty
    ], Network, "connection", null);
    __decorate([
        plugin_1.Cordova({
            eventObservable: true,
            event: 'offline'
        })
    ], Network, "onDisconnect", null);
    __decorate([
        plugin_1.Cordova({
            eventObservable: true,
            event: 'online'
        })
    ], Network, "onConnect", null);
    Network = __decorate([
        plugin_1.Plugin({
            plugin: 'cordova-plugin-network-information',
            repo: 'https://github.com/apache/cordova-plugin-network-information',
            platforms: ['Amazon Fire OS', 'iOS', 'Android', 'BlackBerry 10', 'Windows Phone 7', 'Windows Phone 8', 'Windows', 'Firefox OS', 'Browser'],
            pluginRef: 'navigator.connection'
        })
    ], Network);
    return Network;
}());
exports.Network = Network;
var Connection = (function () {
    function Connection() {
    }
    Object.defineProperty(Connection, "UNKNOWN", {
        get: function () { return 'unknown'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "ETHERNET", {
        get: function () { return 'ethernet'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "WIFI", {
        get: function () { return 'wifi'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "CELL_2G", {
        get: function () { return '2g'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "CELL_3G", {
        get: function () { return '3g'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "CELL_4G", {
        get: function () { return '4g'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "CELL", {
        get: function () { return 'cellular'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection, "NONE", {
        get: function () { return 'none'; },
        enumerable: true,
        configurable: true
    });
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=network.js.map