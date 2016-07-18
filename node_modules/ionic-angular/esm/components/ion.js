var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { getDimensions as _getDimensions, clearDimensions } from '../util/dom';
var ids = 0;
/**
 * Base class for all Ionic components. Exposes some common functionality
 * that all Ionic components need, such as accessing underlying native elements and
 * sending/receiving app-level events.
 */
export var Ion = function () {
    function Ion(elementRef) {
        _classCallCheck(this, Ion);

        this.elementRef = elementRef;
        this._id = 'i' + ids++;
    }

    _createClass(Ion, [{
        key: 'getElementRef',
        value: function getElementRef() {
            return this.elementRef;
        }
    }, {
        key: 'getNativeElement',
        value: function getNativeElement() {
            return this.elementRef.nativeElement;
        }
    }, {
        key: 'getDimensions',
        value: function getDimensions() {
            return _getDimensions(this.elementRef.nativeElement, this._id);
        }
    }, {
        key: 'width',
        value: function width() {
            return _getDimensions(this.elementRef.nativeElement, this._id).width;
        }
    }, {
        key: 'height',
        value: function height() {
            return _getDimensions(this.elementRef.nativeElement, this._id).height;
        }
    }, {
        key: 'ngOnDestroy',
        value: function ngOnDestroy() {
            clearDimensions(this._id);
        }
    }]);

    return Ion;
}();