var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Config } from '../config/config';
import { Form } from './form';
import { hasFocusedTextInput, nativeRaf, rafFrames, nativeTimeout } from './dom';
import { Key } from './key';
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
export var Keyboard = function () {
    function Keyboard(config, _form, _zone) {
        var _this = this;

        _classCallCheck(this, Keyboard);

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


    _createClass(Keyboard, [{
        key: "isOpen",
        value: function isOpen() {
            return hasFocusedTextInput();
        }
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

    }, {
        key: "onClose",
        value: function onClose(callback) {
            var pollingInternval = arguments.length <= 1 || arguments[1] === undefined ? KEYBOARD_CLOSE_POLLING : arguments[1];
            var pollingChecksMax = arguments.length <= 2 || arguments[2] === undefined ? KEYBOARD_POLLING_CHECKS_MAX : arguments[2];

            console.debug('keyboard onClose');
            var self = this;
            var checks = 0;
            var promise = null;
            if (!callback) {
                // a callback wasn't provided, so let's return a promise instead
                promise = new Promise(function (resolve) {
                    callback = resolve;
                });
            }
            function checkKeyboard() {
                console.debug('keyboard isOpen', self.isOpen());
                if (!self.isOpen() || checks > pollingChecksMax) {
                    rafFrames(30, function () {
                        self._zone.run(function () {
                            console.debug('keyboard closed');
                            callback();
                        });
                    });
                } else {
                    nativeTimeout(checkKeyboard, pollingInternval);
                }
                checks++;
            }
            nativeTimeout(checkKeyboard, pollingInternval);
            return promise;
        }
        /**
         * Programmatically close the keyboard
         *
         */

    }, {
        key: "close",
        value: function close() {
            var _this2 = this;

            console.debug('keyboard close()');
            nativeRaf(function () {
                if (hasFocusedTextInput()) {
                    // only focus out when a text input has focus
                    _this2._form.focusOut();
                }
            });
        }
        /**
         * @private
         */

    }, {
        key: "focusOutline",
        value: function focusOutline(setting, document) {
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
                nativeRaf(function () {
                    document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
                });
            }
            if (setting === true) {
                isKeyInputEnabled = true;
                return cssClass();
            } else if (setting === false) {
                return;
            }
            // default is to add the focus-outline when the tab key is used
            function keyDown(ev) {
                if (!isKeyInputEnabled && ev.keyCode === Key.TAB) {
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
        }
    }]);

    return Keyboard;
}();
Keyboard = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c || Object])], Keyboard);
var KEYBOARD_CLOSE_POLLING = 150;
var KEYBOARD_POLLING_CHECKS_MAX = 100;
var _a, _b, _c;