"use strict";
/**
 * Storage is an easy way to store key/value pairs and other complicated
 * data in a way that uses a variety of storage engines underneath.
 *
 * For most cases, we recommend the SqlStorage system as it will store
 * data in a file in the app's sandbox. LocalStorage should ONLY be used
 * for temporary data as it may be 'cleaned up' by the operation system
 * during low disk space situations.
 */
/**
 * @private
*/
var Storage = (function () {
    function Storage(strategyCls, options) {
        this._strategy = new strategyCls(options);
    }
    Storage.prototype.get = function (key) {
        return this._strategy.get(key);
    };
    Storage.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                void 0;
                throw e; // rethrowing exception so it can be handled with .catch()
            }
        });
    };
    Storage.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    Storage.prototype.set = function (key, value) {
        return this._strategy.set(key, value);
    };
    Storage.prototype.remove = function (key) {
        return this._strategy.remove(key);
    };
    Storage.prototype.query = function (query, params) {
        return this._strategy.query(query, params);
    };
    Storage.prototype.clear = function () {
        return this._strategy.clear();
    };
    return Storage;
}());
exports.Storage = Storage;
/**
 * @private
*/
var StorageEngine = (function () {
    function StorageEngine(options) {
        if (options === void 0) { options = {}; }
    }
    StorageEngine.prototype.get = function (key) {
        throw Error('get() not implemented for this storage engine');
    };
    StorageEngine.prototype.set = function (key, value) {
        throw Error('set() not implemented for this storage engine');
    };
    StorageEngine.prototype.remove = function (key) {
        throw Error('remove() not implemented for this storage engine');
    };
    StorageEngine.prototype.query = function (query, params) {
        throw Error('query() not implemented for this storage engine');
    };
    StorageEngine.prototype.clear = function () {
        throw Error('clear() not implemented for this storage engine');
    };
    return StorageEngine;
}());
exports.StorageEngine = StorageEngine;
