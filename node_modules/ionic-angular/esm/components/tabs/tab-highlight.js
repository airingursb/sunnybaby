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
import { Directive, ElementRef } from '@angular/core';
import { rafFrames } from '../../util/dom';
/**
 * @private
 */
export var TabHighlight = function () {
    function TabHighlight(_elementRef) {
        _classCallCheck(this, TabHighlight);

        this._elementRef = _elementRef;
    }

    _createClass(TabHighlight, [{
        key: "select",
        value: function select(tab) {
            var _this = this;

            rafFrames(3, function () {
                var d = tab.btn.getDimensions();
                var ele = _this._elementRef.nativeElement;
                ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
                if (!_this._init) {
                    _this._init = true;
                    rafFrames(6, function () {
                        ele.classList.add('animate');
                    });
                }
            });
        }
    }]);

    return TabHighlight;
}();
TabHighlight = __decorate([Directive({
    selector: 'tab-highlight'
}), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object])], TabHighlight);
var _a;