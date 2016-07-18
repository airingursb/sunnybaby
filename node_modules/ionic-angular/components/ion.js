"use strict";
var dom_1 = require('../util/dom');
var ids = 0;
/**
 * Base class for all Ionic components. Exposes some common functionality
 * that all Ionic components need, such as accessing underlying native elements and
 * sending/receiving app-level events.
 */
var Ion = (function () {
    function Ion(elementRef) {
        this.elementRef = elementRef;
        this._id = 'i' + ids++;
    }
    Ion.prototype.getElementRef = function () {
        return this.elementRef;
    };
    Ion.prototype.getNativeElement = function () {
        return this.elementRef.nativeElement;
    };
    Ion.prototype.getDimensions = function () {
        return dom_1.getDimensions(this.elementRef.nativeElement, this._id);
    };
    Ion.prototype.width = function () {
        return dom_1.getDimensions(this.elementRef.nativeElement, this._id).width;
    };
    Ion.prototype.height = function () {
        return dom_1.getDimensions(this.elementRef.nativeElement, this._id).height;
    };
    Ion.prototype.ngOnDestroy = function () {
        dom_1.clearDimensions(this._id);
    };
    return Ion;
}());
exports.Ion = Ion;
