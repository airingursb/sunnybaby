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
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @private
 */
export var VirtualHeader = function VirtualHeader(templateRef) {
    _classCallCheck(this, VirtualHeader);

    this.templateRef = templateRef;
};
VirtualHeader = __decorate([Directive({ selector: '[virtualHeader]' }), __metadata('design:paramtypes', [typeof (_a = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _a || Object])], VirtualHeader);
/**
 * @private
 */
export var VirtualFooter = function VirtualFooter(templateRef) {
    _classCallCheck(this, VirtualFooter);

    this.templateRef = templateRef;
};
VirtualFooter = __decorate([Directive({ selector: '[virtualFooter]' }), __metadata('design:paramtypes', [typeof (_b = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _b || Object])], VirtualFooter);
/**
 * @private
 */
export var VirtualItem = function VirtualItem(templateRef, viewContainer) {
    _classCallCheck(this, VirtualItem);

    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
};
VirtualItem = __decorate([Directive({ selector: '[virtualItem]' }), __metadata('design:paramtypes', [typeof (_c = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _c || Object, typeof (_d = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _d || Object])], VirtualItem);
var _a, _b, _c, _d;