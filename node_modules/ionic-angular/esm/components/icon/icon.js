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
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Config } from '../../config/config';
/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components.
 * For a full list of available icons, check out the
 * [Ionicons docs](../../../../ionicons).
 *
 * One feature of Ionicons in Ionic is when icon names are set, the actual icon
 * which is rendered can change slightly depending on the mode the app is
 * running from. For example, by setting the icon name of `alarm`, on iOS the
 * icon will automatically apply `ios-alarm`, and on Material Design it will
 * automatically apply `md-alarm`. This allows the developer to write the
 * markup once while Ionic applies the appropriate icon based on the mode.
 *
 * @usage
 * ```html
 * <!-- automatically uses the correct "star" icon depending on the mode -->
 * <ion-icon name="star"></ion-icon>
 *
 * <!-- explicity set the icon for each mode -->
 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
 *
 * <!-- always use the same icon, no matter what the mode -->
 * <ion-icon name="ios-clock"></ion-icon>
 * <ion-icon name="logo-twitter"></ion-icon>
 * ```
 *
 * @demo /docs/v2/demos/icon/
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
export var Icon = function () {
    function Icon(config, _elementRef, _renderer) {
        _classCallCheck(this, Icon);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._name = '';
        this._ios = '';
        this._md = '';
        this._css = '';
        this.mode = config.get('iconMode');
    }
    /**
     * @private
     */


    _createClass(Icon, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            if (this._css) {
                this._renderer.setElementClass(this._elementRef.nativeElement, this._css, false);
            }
        }
        /**
         * @input {string} Icon to use. Will load the appropriate icon for each mode
         */

    }, {
        key: "update",

        /**
         * @private
         */
        value: function update() {
            var css = 'ion-';
            if (this._ios && this.mode === 'ios') {
                css += this._ios;
            } else if (this._md && this.mode === 'md') {
                css += this._md;
            } else {
                css += this._name;
            }
            if (this.mode === 'ios' && !this.isActive && css.indexOf('logo') < 0) {
                css += '-outline';
            }
            if (this._css !== css) {
                if (this._css) {
                    this._renderer.setElementClass(this._elementRef.nativeElement, this._css, false);
                }
                this._css = css;
                this._renderer.setElementClass(this._elementRef.nativeElement, css, true);
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-label', css.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
            }
        }
        /**
         * @private
         * @param {string} add class name
         */

    }, {
        key: "addClass",
        value: function addClass(className) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
        }
    }, {
        key: "name",
        get: function get() {
            return this._name;
        },
        set: function set(val) {
            if (!/^md-|^ios-|^logo-/.test(val)) {
                // this does not have one of the defaults
                // so lets auto add in the mode prefix for them
                val = this.mode + '-' + val;
            }
            this._name = val;
            this.update();
        }
        /**
         * @input {string} Explicitly set the icon to use on iOS
         */

    }, {
        key: "ios",
        get: function get() {
            return this._ios;
        },
        set: function set(val) {
            this._ios = val;
            this.update();
        }
        /**
         * @input {string} Explicitly set the icon to use on MD
         */

    }, {
        key: "md",
        get: function get() {
            return this._md;
        },
        set: function set(val) {
            this._md = val;
            this.update();
        }
        /**
         * @input {bool} Whether or not the icon has an "active" appearance. On iOS an active icon is filled in or full appearance, and an inactive icon on iOS will use an outlined version of the icon same icon. Material Design icons do not change appearance depending if they're active or not. The `isActive` property is largely used by the tabbar.
         */

    }, {
        key: "isActive",
        get: function get() {
            return this._isActive === undefined || this._isActive === true || this._isActive === 'true';
        },
        set: function set(val) {
            this._isActive = val;
            this.update();
        }
    }]);

    return Icon;
}();
__decorate([Input(), __metadata('design:type', String)], Icon.prototype, "name", null);
__decorate([Input(), __metadata('design:type', String)], Icon.prototype, "ios", null);
__decorate([Input(), __metadata('design:type', String)], Icon.prototype, "md", null);
__decorate([Input(), __metadata('design:type', Boolean)], Icon.prototype, "isActive", null);
Icon = __decorate([Directive({
    selector: 'ion-icon',
    host: {
        'role': 'img'
    }
}), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object])], Icon);
var _a, _b, _c;