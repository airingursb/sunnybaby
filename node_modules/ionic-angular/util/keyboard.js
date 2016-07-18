"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var config_1 = require('../config/config');
var form_1 = require('./form');
var dom_1 = require('./dom');
var key_1 = require('./key');
/**
 * @name Keyboard
 * @description
 * The `Keyboard` class allows you to work with the keyboard events provided by the Ionic keyboard plugin.
 *
 * @usage
 * ```ts
 * export class MyClass{
 *  constructor(keyboard: Keyboard){
 *    this.keyboard = keyboard;
 *  }
 * }
 *
 * ```
 */
var Keyboard = (function () {
    function Keyboard(config, _form, _zone) {
        var _this = this;
        this._form = _form;
        this._zone = _zone;
        _zone.runOutsideAngular(function () {
            _this.focusOutline(config.get('focusOutline'), document);
        });
    }
    /**
     * Check to see if the keyboard is open or not.
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *  }
     *  keyboardCheck(){
     *    setTimeout(()  => console.log('is the keyboard open ', this.keyboard.isOpen()));
     *  }
     * }
     *
     * ```
     *
     * @return {boolean} returns a true or flase value if the keyboard is open or not
     */
    Keyboard.prototype.isOpen = function () {
        return dom_1.hasFocusedTextInput();
    };
    /**
     * When the keyboard is closed, call any methods you want
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *    this.keyboard.onClose(this.closeCallback);
     *  }
     *  closeCallback(){
     *     // call what ever functionality you want on keyboard close
     *     console.log('Closing time');
     *  }
     * }
     *
     * ```
     * @param {function} callback method you want to call when the keyboard has been closed
     * @return {function} returns a callback that gets fired when the keyboard is closed
     */
    Keyboard.prototype.onClose = function (callback, pollingInternval, pollingChecksMax) {
        if (pollingInternval === void 0) { pollingInternval = KEYBOARD_CLOSE_POLLING; }
        if (pollingChecksMax === void 0) { pollingChecksMax = KEYBOARD_POLLING_CHECKS_MAX; }
        void 0;
        var self = this;
        var checks = 0;
        var promise = null;
        if (!callback) {
            // a callback wasn't provided, so let's return a promise instead
            promise = new Promise(function (resolve) { callback = resolve; });
        }
        function checkKeyboard() {
            void 0;
            if (!self.isOpen() || checks > pollingChecksMax) {
                dom_1.rafFrames(30, function () {
                    self._zone.run(function () {
                        void 0;
                        callback();
                    });
                });
            }
            else {
                dom_1.nativeTimeout(checkKeyboard, pollingInternval);
            }
            checks++;
        }
        dom_1.nativeTimeout(checkKeyboard, pollingInternval);
        return promise;
    };
    /**
     * Programmatically close the keyboard
     *
     */
    Keyboard.prototype.close = function () {
        var _this = this;
        void 0;
        dom_1.nativeRaf(function () {
            if (dom_1.hasFocusedTextInput()) {
                // only focus out when a text input has focus
                _this._form.focusOut();
            }
        });
    };
    /**
     * @private
     */
    Keyboard.prototype.focusOutline = function (setting, document) {
        /* Focus Outline
         * --------------------------------------------------
         * By default, when a keydown event happens from a tab key, then
         * the 'focus-outline' css class is added to the body element
         * so focusable elements have an outline. On a mousedown or
         * touchstart event, then the 'focus-outline' css class is removed.
         *
         * Config default overrides:
         * focusOutline: true     - Always add the focus-outline
         * focusOutline: false    - Do not add the focus-outline
         */
        var self = this;
        var isKeyInputEnabled = false;
        function cssClass() {
            dom_1.nativeRaf(function () {
                document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
            });
        }
        if (setting === true) {
            isKeyInputEnabled = true;
            return cssClass();
        }
        else if (setting === false) {
            return;
        }
        // default is to add the focus-outline when the tab key is used
        function keyDown(ev) {
            if (!isKeyInputEnabled && ev.keyCode === key_1.Key.TAB) {
                isKeyInputEnabled = true;
                enableKeyInput();
            }
        }
        function pointerDown() {
            isKeyInputEnabled = false;
            enableKeyInput();
        }
        function enableKeyInput() {
            cssClass();
            self._zone.runOutsideAngular(function () {
                document.removeEventListener('mousedown', pointerDown);
                document.removeEventListener('touchstart', pointerDown);
                if (isKeyInputEnabled) {
                    document.addEventListener('mousedown', pointerDown);
                    document.addEventListener('touchstart', pointerDown);
                }
            });
        }
        document.addEventListener('keydown', keyDown);
    };
    Keyboard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_1.Config, form_1.Form, core_1.NgZone])
    ], Keyboard);
    return Keyboard;
}());
exports.Keyboard = Keyboard;
var KEYBOARD_CLOSE_POLLING = 150;
var KEYBOARD_POLLING_CHECKS_MAX = 100;
