"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Transfer
 * @description This plugin allows you to upload and download files.
 * Example:
 * Create instance:
 * const fileTransfer = new Transfer();
 *
 * Upload a file:
 * fileTransfer.upload(..).then(..).catch(..);
 *
 * Download a file:
 * fileTransfer.download(..).then(..).catch(..);
 *
 * Abort active transfer:
 * fileTransfer.abort();
 */
var Transfer = (function () {
    function Transfer() {
        this._objectInstance = new FileTransfer();
    }
    /**
     * Sends a file to a server.
     *
     * @param {string} fileUrl  Filesystem URL representing the file on the device or a data URI. For backwards compatibility, this can also be the full path of the file on the device.
     * @param {string} url  URL of the server to receive the file, as encoded by encodeURI().
     * @param {FileUploadOptions} options  Optional parameters.
     * @param {boolean} trustAllHosts: Optional parameter, defaults to false. If set to true, it accepts all security certificates. This is useful since Android rejects self-signed security certificates. Not recommended for production use. Supported on Android and iOS.
     * @return Returns a Promise that resolves to a FileUploadResult and rejects with FileTransferError.
     */
    Transfer.prototype.upload = function (fileUrl, url, options, trustAllHosts) {
        return;
    };
    /**
     * Downloads a file from server.
     *
     * @param {string} source  URL of the server to download the file, as encoded by encodeURI().
     * @param {stirng} target  Filesystem url representing the file on the device. For backwards compatibility, this can also be the full path of the file on the device.
     * @param {boolean} trustAllHosts  Optional parameter, defaults to false. If set to true, it accepts all security certificates. This is useful because Android rejects self-signed security certificates. Not recommended for production use. Supported on Android and iOS.
     * @param {object} Optional parameters, currently only supports headers (such as Authorization (Basic Authentication), etc).
     * @return Returns a Promise that resolves to a FileEntry object.
     */
    Transfer.prototype.download = function (source, target, trustAllHosts, options) {
        return;
    };
    /**
     * Registers a listener that gets called whenever a new chunk of data is transferred.
     * @param {function} Listener that takes a progress event.
     */
    Transfer.prototype.onProgress = function (listener) {
        this._objectInstance.onprogress = listener;
    };
    /**
     * Aborts an in-progress transfer. The onerror callback is passed a FileTransferError
     * object which has an error code of FileTransferError.ABORT_ERR.
     */
    Transfer.prototype.abort = function () { };
    Transfer.FILE_NOT_FOUND_ERR = 1;
    Transfer.INVALID_URL_ERR = 2;
    Transfer.CONNECTION_ERR = 3;
    Transfer.ABORT_ERR = 4;
    Transfer.NOT_MODIFIED_ERR = 4;
    __decorate([
        plugin_1.CordovaInstance({
            successIndex: 2,
            errorIndex: 3
        })
    ], Transfer.prototype, "upload", null);
    __decorate([
        plugin_1.CordovaInstance({
            successIndex: 2,
            errorIndex: 3
        })
    ], Transfer.prototype, "download", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], Transfer.prototype, "abort", null);
    Transfer = __decorate([
        plugin_1.Plugin({
            plugin: 'cordova-plugin-file-transfer',
            pluginRef: 'FileTransfer',
            repo: 'https://github.com/apache/cordova-plugin-file-transfer'
        })
    ], Transfer);
    return Transfer;
}());
exports.Transfer = Transfer;
//# sourceMappingURL=filetransfer.js.map