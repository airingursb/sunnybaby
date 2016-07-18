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
import { Component, Input, HostBinding, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, NgZone } from '@angular/core';
import { nativeRaf } from '../../util/dom';
import { isPresent } from '../../util/util';
import { Platform } from '../../platform/platform';
export var Img = function () {
    function Img(_elementRef, _platform, _zone) {
        _classCallCheck(this, Img);

        this._elementRef = _elementRef;
        this._platform = _platform;
        this._zone = _zone;
        this._src = '';
        this._normalizeSrc = '';
        this._imgs = [];
        this._enabled = true;
    }

    _createClass(Img, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            this._init = true;
            this._update();
        }
    }, {
        key: "_update",
        value: function _update() {
            var _this = this;

            if (this._enabled && this._src !== '') {
                // actively update the image
                for (var i = this._imgs.length - 1; i >= 0; i--) {
                    if (this._imgs[i].src === this._normalizeSrc) {
                        // this is the active image
                        if (this._imgs[i].complete) {
                            this._loaded(true);
                        }
                    } else {
                        // no longer the active image
                        if (this._imgs[i].parentElement) {
                            this._imgs[i].parentElement.removeChild(this._imgs[i]);
                        }
                        this._imgs.splice(i, 1);
                    }
                }
                if (!this._imgs.length) {
                    this._zone.runOutsideAngular(function () {
                        var img = new Image();
                        img.style.width = _this._width;
                        img.style.height = _this._height;
                        if (isPresent(_this.alt)) {
                            img.alt = _this.alt;
                        }
                        if (isPresent(_this.title)) {
                            img.title = _this.title;
                        }
                        img.addEventListener('load', function () {
                            if (img.src === _this._normalizeSrc) {
                                _this._elementRef.nativeElement.appendChild(img);
                                nativeRaf(function () {
                                    _this._update();
                                });
                            }
                        });
                        img.src = _this._src;
                        _this._imgs.push(img);
                        _this._loaded(false);
                    });
                }
            } else {
                // do not actively update the image
                if (!this._imgs.some(function (img) {
                    return img.src === _this._normalizeSrc;
                })) {
                    this._loaded(false);
                }
            }
        }
    }, {
        key: "_loaded",
        value: function _loaded(isLoaded) {
            this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
        }
    }, {
        key: "enable",
        value: function enable(shouldEnable) {
            this._enabled = shouldEnable;
            this._update();
        }
    }, {
        key: "src",
        set: function set(val) {
            var tmpImg = new Image();
            tmpImg.src = isPresent(val) ? val : '';
            this._src = isPresent(val) ? val : '';
            this._normalizeSrc = tmpImg.src;
            if (this._init) {
                this._update();
            }
        }
    }, {
        key: "width",
        set: function set(val) {
            this._w = getUnitValue(val);
        }
    }, {
        key: "height",
        set: function set(val) {
            this._h = getUnitValue(val);
        }
    }, {
        key: "_width",
        get: function get() {
            return isPresent(this._w) ? this._w : '';
        }
    }, {
        key: "_height",
        get: function get() {
            return isPresent(this._h) ? this._h : '';
        }
    }]);

    return Img;
}();
__decorate([Input(), __metadata('design:type', String), __metadata('design:paramtypes', [String])], Img.prototype, "src", null);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Img.prototype, "width", null);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Img.prototype, "height", null);
__decorate([Input(), __metadata('design:type', String)], Img.prototype, "alt", void 0);
__decorate([Input(), __metadata('design:type', String)], Img.prototype, "title", void 0);
__decorate([HostBinding('style.width'), __metadata('design:type', String)], Img.prototype, "_width", null);
__decorate([HostBinding('style.height'), __metadata('design:type', String)], Img.prototype, "_height", null);
Img = __decorate([Component({
    selector: 'ion-img',
    template: '<div class="img-placeholder" [style.height]="_h" [style.width]="_w"></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Platform !== 'undefined' && Platform) === 'function' && _b || Object, typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c || Object])], Img);
function getUnitValue(val) {
    if (isPresent(val)) {
        if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
                return val;
            }
            if (val.length) {
                return val + 'px';
            }
        } else if (typeof val === 'number') {
            return val + 'px';
        }
    }
    return '';
}
var _a, _b, _c;