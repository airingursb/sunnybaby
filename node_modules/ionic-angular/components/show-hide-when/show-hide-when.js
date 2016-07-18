"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_1 = require('../../platform/platform');
/**
 * @private
 */
var DisplayWhen = (function () {
    function DisplayWhen(conditions, platform, ngZone) {
        var _this = this;
        this.isMatch = false;
        this.platform = platform;
        if (!conditions)
            return;
        this.conditions = conditions.split(',');
        // check if its one of the matching platforms first
        // a platform does not change during the life of an app
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] && platform.is(this.conditions[i])) {
                this.isMatch = true;
                return;
            }
        }
        if (this.orientation()) {
            // add window resize listener
            platform.onResize(function () {
                ngZone.run(function () {
                    _this.orientation();
                });
            });
            return;
        }
    }
    DisplayWhen.prototype.orientation = function () {
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] === 'portrait') {
                this.isMatch = this.platform.isPortrait();
                return true;
            }
            if (this.conditions[i] === 'landscape') {
                this.isMatch = this.platform.isLandscape();
                return true;
            }
        }
    };
    return DisplayWhen;
}());
exports.DisplayWhen = DisplayWhen;
/**
 *
 * @name ShowWhen
 * @description
 * The `showWhen` attribute takes a string that represents a platform or screen orientation.
 * The element the attribute is added to will only be shown when that platform or screen orientation is active.
 *
 * Complements the [hideWhen attribute](../HideWhen). If the `showWhen` attribute is used on an
 * element that also has the `hideWhen` attribute, the element will not show if `hideWhen` evaluates
 * to `true` or `showWhen` evaluates to `false`. If the `hidden` attribute is also added, the element
 * will not show if `hidden` evaluates to `true`.
 *
 * View the [Platform API docs](../../../platform/Platform) for more information on the different
 * platforms you can use.
 *
 * @usage
 * ```html
 * <div showWhen="android">
 *  I am visible on Android!
 * </div>
 *
 * <div showWhen="ios">
 *  I am visible on iOS!
 * </div>
 *
 * <div showWhen="android,ios">
 *  I am visible on Android and iOS!
 * </div>
 *
 * <div showWhen="portrait">
 *  I am visible on Portrait!
 * </div>
 *
 * <div showWhen="landscape">
 *  I am visible on Landscape!
 * </div>
 * ```
 * @demo /docs/v2/demos/show-when/
 * @see {@link ../HideWhen HideWhen API Docs}
 * @see {@link ../../../platform/Platform Platform API Docs}
 */
var ShowWhen = (function (_super) {
    __extends(ShowWhen, _super);
    function ShowWhen(showWhen, platform, ngZone) {
        _super.call(this, showWhen, platform, ngZone);
    }
    ShowWhen = __decorate([
        core_1.Directive({
            selector: '[showWhen]',
            host: {
                '[class.hidden-show-when]': '!isMatch'
            }
        }),
        __param(0, core_1.Attribute('showWhen')), 
        __metadata('design:paramtypes', [String, platform_1.Platform, core_1.NgZone])
    ], ShowWhen);
    return ShowWhen;
}(DisplayWhen));
exports.ShowWhen = ShowWhen;
/**
 * @name HideWhen
 * @description
 * The `hideWhen` attribute takes a string that represents a plaform or screen orientation.
 * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
 *
 * Complements the [showWhen attribute](../ShowWhen). If the `hideWhen` attribute is used on an
 * element that also has the `showWhen` attribute, the element will not show if `hideWhen` evaluates
 * to `true` or `showWhen` evaluates to `false`. If the `hidden` attribute is also added, the element
 * will not show if `hidden` evaluates to `true`.
 *
 * View the [Platform API docs](../../../platform/Platform) for more information on the different
 * platforms you can use.
 *
 * @usage
 * ```html
 * <div hideWhen="android">
 *  I am hidden on Android!
 * </div>
 *
 * <div hideWhen="ios">
 *  I am hidden on iOS!
 * </div>
 *
 * <div hideWhen="android,ios">
 *  I am hidden on Android and iOS!
 * </div>
 *
 * <div hideWhen="portrait">
 *  I am hidden on Portrait!
 * </div>
 *
 * <div hideWhen="landscape">
 *  I am hidden on Landscape!
 * </div>
 * ```
 *
 * @demo /docs/v2/demos/hide-when/
 * @see {@link ../ShowWhen ShowWhen API Docs}
 * @see {@link ../../../platform/Platform Platform API Docs}
*/
var HideWhen = (function (_super) {
    __extends(HideWhen, _super);
    function HideWhen(hideWhen, platform, ngZone) {
        _super.call(this, hideWhen, platform, ngZone);
    }
    HideWhen = __decorate([
        core_1.Directive({
            selector: '[hideWhen]',
            host: {
                '[class.hidden-hide-when]': 'isMatch'
            }
        }),
        __param(0, core_1.Attribute('hideWhen')), 
        __metadata('design:paramtypes', [String, platform_1.Platform, core_1.NgZone])
    ], HideWhen);
    return HideWhen;
}(DisplayWhen));
exports.HideWhen = HideWhen;
