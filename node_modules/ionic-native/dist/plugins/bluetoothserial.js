"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Bluetooth Serial
 * @description This plugin enables serial communication over Bluetooth. It was written for communicating between Android or iOS and an Arduino.
 * @usage
 */
var BluetoothSerial = (function () {
    function BluetoothSerial() {
    }
    /**
     * Connect to a Bluetooth device
     * Returns an Observable. Subscribe to connect, unsubscribe to disconnect.
     * @param macAddress_or_uuid Identifier of the remote device
     */
    BluetoothSerial.connect = function (macAddress_or_uuid) { return; };
    /**
     * Connect insecurely to a Bluetooth device
     * Returns an Observable. Subscribe to connect, unsubscribe to disconnect.
     * @param macAddress Identifier of the remote device
     */
    BluetoothSerial.connectInsecure = function (macAddress) { return; };
    /**
     * Writes data to the serial port
     * @param data ArrayBuffer of data
     * @usage
     * ```ts
     * // Write a string
     * Bluetooth.write("hello world").then(success, failure);
     *
     * // Array of int or bytes
     * Bluetooth.write([186, 220, 222]).then(success, failure);
     *
     * // Typed Array
     * var data = new Uint8Array(4);
     * data[0] = 0x41;
     * data[1] = 0x42;
     * data[2] = 0x43;
     * data[3] = 0x44;
     * Bluetooth.write(data).then(success, failure);
     *
     * // Array Buffer
     * Bluetooth.write(data.buffer).then(success, failure);
     * ```
     */
    BluetoothSerial.write = function (data) { return; };
    /**
     * Gets the number of bytes of data available
     */
    BluetoothSerial.available = function () { return; };
    /**
     * Reads data from the buffer
     */
    BluetoothSerial.read = function () { return; };
    /**
     * Reads data from the buffer until it reaches a delimiter
     * @param delimiter
     */
    BluetoothSerial.readUntil = function (delimiter) { return; };
    /**
     * Subscribe to be notified when data is received
     * @param delimiter
     */
    BluetoothSerial.subscribe = function (delimiter) { return; };
    /**
     * Subscribe to be notified when data is received
     */
    BluetoothSerial.subscribeRawData = function () { return; };
    /**
     * Clears data in buffer
     */
    BluetoothSerial.clear = function () { return; };
    /**
     * Lists bonded devices
     */
    BluetoothSerial.list = function () { return; };
    /**
     * Reports if bluetooth is enabled
     */
    BluetoothSerial.isEnabled = function () { return; };
    /**
     * Reports the connection status
     */
    BluetoothSerial.isConnected = function () { return; };
    /**
     * Reads the RSSI from the connected peripheral
     */
    BluetoothSerial.readRSSI = function () { return; };
    /**
     * Show the Bluetooth settings on the device
     */
    BluetoothSerial.showBluetoothSettings = function () { return; };
    /**
     * Enable Bluetooth on the device
     */
    BluetoothSerial.enable = function () { return; };
    /**
     * Discover unpaired devices
     * @usage
     * ```ts
     * [{
     *    "class": 276,
     *    "id": "10:BF:48:CB:00:00",
     *    "address": "10:BF:48:CB:00:00",
     *    "name": "Nexus 7"
     * }, {
     *    "class": 7936,
     *    "id": "00:06:66:4D:00:00",
     *    "address": "00:06:66:4D:00:00",
     *    "name": "RN42"
     * }]
     * ```
     */
    BluetoothSerial.discoverUnpaired = function () { return; };
    /**
     * Subscribe to be notified on Bluetooth device discovery. Discovery process must be initiated with the `discoverUnpaired` function.
     */
    BluetoothSerial.setDeviceDiscoveredListener = function () { return; };
    /**
     * Sets the human readable device name that is broadcasted to other devices
     * @param newName Desired name of device
     */
    BluetoothSerial.setName = function (newName) { };
    /**
     * Makes the device discoverable by other devices
     * @param discoverableDuration Desired number of seconds device should be discoverable for
     */
    BluetoothSerial.setDiscoverable = function (discoverableDuration) { };
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'disconnect'
        })
    ], BluetoothSerial, "connect", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            observable: true,
            clearFunction: 'disconnect'
        })
    ], BluetoothSerial, "connectInsecure", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "write", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "available", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "read", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "readUntil", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'unsubscribe'
        })
    ], BluetoothSerial, "subscribe", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'unsubscribeRawData'
        })
    ], BluetoothSerial, "subscribeRawData", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "clear", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "list", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "isEnabled", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "isConnected", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "readRSSI", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "showBluetoothSettings", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "enable", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "discoverUnpaired", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'clearDeviceDiscoveredListener'
        })
    ], BluetoothSerial, "setDeviceDiscoveredListener", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            sync: true
        })
    ], BluetoothSerial, "setName", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            sync: true
        })
    ], BluetoothSerial, "setDiscoverable", null);
    BluetoothSerial = __decorate([
        plugin_1.Plugin({
            repo: 'https://github.com/don/BluetoothSerial',
            plugin: 'cordova-plugin-bluetooth-serial',
            pluginRef: 'bluetoothSerial',
            platforms: ['Android', 'iOS', 'Windows Phone', 'Browser']
        })
    ], BluetoothSerial);
    return BluetoothSerial;
}());
exports.BluetoothSerial = BluetoothSerial;
//# sourceMappingURL=bluetoothserial.js.map