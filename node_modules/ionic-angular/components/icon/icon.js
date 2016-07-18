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
var config_1 = require('../../config/config');
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
var Icon = (function () {
    function Icon(config, _elementRef, _renderer) {
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
    Icon.prototype.ngOnDestroy = function () {
        if (this._css) {
            this._renderer.setElementClass(this._elementRef.nativeElement, this._css, false);
        }
    };
    Object.defineProperty(Icon.prototype, "name", {
        /**
         * @input {string} Icon to use. Will load the appropriate icon for each mode
         */
        get: function () {
            return this._name;
        },
        set: function (val) {
            if (!(/^md-|^ios-|^logo-/.test(val))) {
                // this does not have one of the defaults
                // so lets auto add in the mode prefix for them
                val = this.mode + '-' + val;
            }
            this._name = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "ios", {
        /**
         * @input {string} Explicitly set the icon to use on iOS
         */
        get: function () {
            return this._ios;
        },
        set: function (val) {
            this._ios = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "md", {
        /**
         * @input {string} Explicitly set the icon to use on MD
         */
        get: function () {
            return this._md;
        },
        set: function (val) {
            this._md = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon.prototype, "isActive", {
        /**
         * @input {bool} Whether or not the icon has an "active" appearance. On iOS an active icon is filled in or full appearance, and an inactive icon on iOS will use an outlined version of the icon same icon. Material Design icons do not change appearance depending if they're active or not. The `isActive` property is largely used by the tabbar.
         */
        get: function () {
            return (this._isActive === undefined || this._isActive === true || this._isActive === 'true');
        },
        set: function (val) {
            this._isActive = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Icon.prototype.update = function () {
        var css = 'ion-';
        if (this._ios && this.mode === 'ios') {
            css += this._ios;
        }
        else if (this._md && this.mode === 'md') {
            css += this._md;
        }
        else {
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
    };
    /**
     * @private
     * @param {string} add class name
     */
    Icon.prototype.addClass = function (className) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Icon.prototype, "name", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Icon.prototype, "ios", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Icon.prototype, "md", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Icon.prototype, "isActive", null);
    Icon = __decorate([
        core_1.Directive({
            selector: 'ion-icon',
            host: {
                'role': 'img'
            }
        }), 
        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, core_1.Renderer])
    ], Icon);
    return Icon;
}());
exports.Icon = Icon;
