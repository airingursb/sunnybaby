"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drag_gesture_1 = require('./drag-gesture');
var util_1 = require('../util');
var SlideGesture = (function (_super) {
    __extends(SlideGesture, _super);
    function SlideGesture(element, opts) {
        if (opts === void 0) { opts = {}; }
        _super.call(this, element, opts);
        this.slide = null;
        this.element = element;
    }
    /*
     * Get the min and max for the slide. pageX/pageY.
     * Only called on dragstart.
     */
    SlideGesture.prototype.getSlideBoundaries = function (slide, ev) {
        return {
            min: 0,
            max: this.element.offsetWidth
        };
    };
    /*
     * Get the element's pos when the drag starts.
     * For example, an open side menu starts at 100% and a closed
     * sidemenu starts at 0%.
     */
    SlideGesture.prototype.getElementStartPos = function (slide, ev) {
        return 0;
    };
    SlideGesture.prototype.canStart = function (ev) {
        return true;
    };
    SlideGesture.prototype.onDragStart = function (ev) {
        if (!this.canStart(ev)) {
            return false;
        }
        this.slide = {};
        this.onSlideBeforeStart(this.slide, ev);
        var _a = this.getSlideBoundaries(this.slide, ev), min = _a.min, max = _a.max;
        this.slide.min = min;
        this.slide.max = max;
        this.slide.elementStartPos = this.getElementStartPos(this.slide, ev);
        this.slide.pointerStartPos = ev.center[this.direction];
        this.slide.started = true;
        this.onSlideStart(this.slide, ev);
        return true;
    };
    SlideGesture.prototype.onDrag = function (ev) {
        if (!this.slide || !this.slide.started) {
            return false;
        }
        this.slide.pos = ev.center[this.direction];
        this.slide.distance = util_1.clamp(this.slide.min, this.slide.pos - this.slide.pointerStartPos + this.slide.elementStartPos, this.slide.max);
        this.slide.delta = this.slide.pos - this.slide.pointerStartPos;
        this.onSlide(this.slide, ev);
        return true;
    };
    SlideGesture.prototype.onDragEnd = function (ev) {
        if (!this.slide || !this.slide.started)
            return;
        this.onSlideEnd(this.slide, ev);
        this.slide = null;
    };
    SlideGesture.prototype.onSlideBeforeStart = function (slide, ev) { };
    SlideGesture.prototype.onSlideStart = function (slide, ev) { };
    SlideGesture.prototype.onSlide = function (slide, ev) { };
    SlideGesture.prototype.onSlideEnd = function (slide, ev) { };
    return SlideGesture;
}(drag_gesture_1.DragGesture));
exports.SlideGesture = SlideGesture;
