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
import { Directive, ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
/**
  * @name Badge
  * @module ionic
  * @description
  * Badges are simple components in Ionic containing numbers or text. You can display a badge to indicate that there is new information associated with the item it is on.
  * @see {@link /docs/v2/components/#badges Badges Component Docs}

 */
export var Badge = function () {
    function Badge(config, _elementRef, _renderer) {
        _classCallCheck(this, Badge);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        var element = _elementRef.nativeElement;
        this._readAttrs(element);
    }
    /**
     * @private
     */


    _createClass(Badge, [{
        key: "_readAttrs",
        value: function _readAttrs(element) {
            var elementAttrs = element.attributes;
            var attrName = void 0;
            for (var i = 0, l = elementAttrs.length; i < l; i++) {
                if (elementAttrs[i].value !== '') continue;
                attrName = elementAttrs[i].name;
                // Ignore attributes item-left, item-right
                if (attrName.indexOf('item') === -1) {
                    this._setClass(attrName);
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "_setClass",
        value: function _setClass(color) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'badge-' + color, true);
        }
    }]);

    return Badge;
}();
Badge = __decorate([Directive({
    selector: 'ion-badge'
}), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object])], Badge);
var _a, _b, _c;