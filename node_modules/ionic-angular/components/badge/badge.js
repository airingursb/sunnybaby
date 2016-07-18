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
  * @name Badge
  * @module ionic
  * @description
  * Badges are simple components in Ionic containing numbers or text. You can display a badge to indicate that there is new information associated with the item it is on.
  * @see {@link /docs/v2/components/#badges Badges Component Docs}

 */
var Badge = (function () {
    function Badge(config, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        var element = _elementRef.nativeElement;
        this._readAttrs(element);
    }
    /**
     * @private
     */
    Badge.prototype._readAttrs = function (element) {
        var elementAttrs = element.attributes;
        var attrName;
        for (var i = 0, l = elementAttrs.length; i < l; i++) {
            if (elementAttrs[i].value !== '')
                continue;
            attrName = elementAttrs[i].name;
            // Ignore attributes item-left, item-right
            if (attrName.indexOf('item') === -1) {
                this._setClass(attrName);
            }
        }
    };
    /**
     * @private
     */
    Badge.prototype._setClass = function (color) {
        this._renderer.setElementClass(this._elementRef.nativeElement, 'badge-' + color, true);
    };
    Badge = __decorate([
        core_1.Directive({
            selector: 'ion-badge'
        }), 
        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, core_1.Renderer])
    ], Badge);
    return Badge;
}());
exports.Badge = Badge;
