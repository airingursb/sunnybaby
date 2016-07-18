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
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var TabHighlight = (function () {
    function TabHighlight(_elementRef) {
        this._elementRef = _elementRef;
    }
    TabHighlight.prototype.select = function (tab) {
        var _this = this;
        dom_1.rafFrames(3, function () {
            var d = tab.btn.getDimensions();
            var ele = _this._elementRef.nativeElement;
            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
            if (!_this._init) {
                _this._init = true;
                dom_1.rafFrames(6, function () {
                    ele.classList.add('animate');
                });
            }
        });
    };
    TabHighlight = __decorate([
        core_1.Directive({
            selector: 'tab-highlight'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TabHighlight);
    return TabHighlight;
}());
exports.TabHighlight = TabHighlight;
