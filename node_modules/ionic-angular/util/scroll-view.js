"use strict";
var dom_1 = require('../util/dom');
var ScrollView = (function () {
    function ScrollView(ele) {
        this._js = false;
        this._top = 0;
        this._el = ele;
    }
    ScrollView.prototype.getTop = function () {
        if (this._js) {
            return this._top;
        }
        return this._top = this._el.scrollTop;
    };
    ScrollView.prototype.setTop = function (top) {
        this._top = top;
        if (this._js) {
            this._el.style[dom_1.CSS.transform] = "translate3d(0px," + top * -1 + "px,0px)";
        }
        else {
            this._el.scrollTop = top;
        }
    };
    ScrollView.prototype.scrollTo = function (x, y, duration) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var self = this;
        if (!self._el) {
            // invalid element
            return Promise.resolve();
        }
        x = x || 0;
        y = y || 0;
        var fromY = self._el.scrollTop;
        var fromX = self._el.scrollLeft;
        var xDistance = Math.abs(x - fromX);
        var yDistance = Math.abs(y - fromY);
        var maxAttempts = (duration / 16) + 100;
        return new Promise(function (resolve) {
            var startTime;
            var attempts = 0;
            // scroll loop
            function step() {
                attempts++;
                if (!self._el || !self.isPlaying || attempts > maxAttempts) {
                    self.isPlaying = false;
                    resolve();
                    return;
                }
                var time = Math.min(1, ((Date.now() - startTime) / duration));
                // where .5 would be 50% of time on a linear scale easedT gives a
                // fraction based on the easing method
                var easedT = (--time) * time * time + 1;
                if (fromY !== y) {
                    self.setTop((easedT * (y - fromY)) + fromY);
                }
                if (fromX !== x) {
                    self._el.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
                }
                if (easedT < 1) {
                    dom_1.nativeRaf(step);
                }
                else {
                    // done
                    resolve();
                }
            }
            // start scroll loop
            self.isPlaying = true;
            // chill out for a frame first
            dom_1.nativeRaf(function () {
                startTime = Date.now();
                dom_1.nativeRaf(step);
            });
        });
    };
    ScrollView.prototype.scrollToTop = function (duration) {
        return this.scrollTo(0, 0, duration);
    };
    ScrollView.prototype.scrollToBottom = function (duration) {
        var y = 0;
        if (this._el) {
            y = this._el.scrollHeight - this._el.clientHeight;
        }
        return this.scrollTo(0, y, duration);
    };
    ScrollView.prototype.stop = function () {
        this.isPlaying = false;
    };
    /**
     * @private
     * JS Scrolling has been provided only as a temporary solution
     * until iOS apps can take advantage of scroll events at all times.
     * The goal is to eventually remove JS scrolling entirely. This
     * method may be removed in the future.
     */
    ScrollView.prototype.jsScroll = function (onScrollCallback) {
        var _this = this;
        this._js = true;
        this._cb = onScrollCallback;
        this._pos = [];
        if (this._el) {
            this._el.addEventListener('touchstart', this._start.bind(this));
            this._el.addEventListener('touchmove', this._move.bind(this));
            this._el.addEventListener('touchend', this._end.bind(this));
            this._el.parentElement.classList.add('js-scroll');
        }
        return function () {
            if (_this._el) {
                _this._el.removeEventListener('touchstart', _this._start.bind(_this));
                _this._el.removeEventListener('touchmove', _this._move.bind(_this));
                _this._el.removeEventListener('touchend', _this._end.bind(_this));
                _this._el.parentElement.classList.remove('js-scroll');
            }
        };
    };
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    ScrollView.prototype._start = function (ev) {
        this._velocity = 0;
        this._pos.length = 0;
        this._max = null;
        this._pos.push(dom_1.pointerCoord(ev).y, Date.now());
    };
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    ScrollView.prototype._move = function (ev) {
        if (this._pos.length) {
            var y = dom_1.pointerCoord(ev).y;
            // ******** DOM READ ****************
            this._setMax();
            this._top -= (y - this._pos[this._pos.length - 2]);
            this._top = Math.min(Math.max(this._top, 0), this._max);
            this._pos.push(y, Date.now());
            // ******** DOM READ THEN DOM WRITE ****************
            this._cb(this._top);
            // ******** DOM WRITE ****************
            this.setTop(this._top);
        }
    };
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    ScrollView.prototype._setMax = function () {
        if (!this._max) {
            // ******** DOM READ ****************
            this._max = (this._el.offsetHeight - this._el.parentElement.offsetHeight + this._el.parentElement.offsetTop);
        }
    };
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    ScrollView.prototype._end = function (ev) {
        // figure out what the scroll position was about 100ms ago
        var positions = this._pos;
        this._velocity = 0;
        dom_1.cancelRaf(this._rafId);
        if (!positions.length)
            return;
        var y = dom_1.pointerCoord(ev).y;
        positions.push(y, Date.now());
        var endPos = (positions.length - 1);
        var startPos = endPos;
        var timeRange = (Date.now() - 100);
        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 2) {
            startPos = i;
        }
        if (startPos !== endPos) {
            // compute relative movement between these two points
            var timeOffset = (positions[endPos] - positions[startPos]);
            var movedTop = (positions[startPos - 1] - positions[endPos - 1]);
            // based on XXms compute the movement to apply for each render step
            this._velocity = ((movedTop / timeOffset) * FRAME_MS);
            // verify that we have enough velocity to start deceleration
            if (Math.abs(this._velocity) > MIN_VELOCITY_START_DECELERATION) {
                // ******** DOM READ ****************
                this._setMax();
                this._rafId = dom_1.nativeRaf(this._decelerate.bind(this));
            }
        }
        positions.length = 0;
    };
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    ScrollView.prototype._decelerate = function () {
        var self = this;
        if (self._velocity) {
            self._velocity *= DECELERATION_FRICTION;
            // update top with updated velocity
            // clamp top within scroll limits
            self._top = Math.min(Math.max(self._top + self._velocity, 0), self._max);
            // ******** DOM READ THEN DOM WRITE ****************
            self._cb(self._top);
            // ******** DOM WRITE ****************
            self.setTop(self._top);
            if (self._top > 0 && self._top < self._max && Math.abs(self._velocity) > MIN_VELOCITY_CONTINUE_DECELERATION) {
                self._rafId = dom_1.nativeRaf(self._decelerate.bind(self));
            }
        }
    };
    /**
     * @private
     */
    ScrollView.prototype.destroy = function () {
        this._velocity = 0;
        this.stop();
        this._el = null;
    };
    return ScrollView;
}());
exports.ScrollView = ScrollView;
var MAX_VELOCITY = 150;
var MIN_VELOCITY_START_DECELERATION = 4;
var MIN_VELOCITY_CONTINUE_DECELERATION = 0.12;
var DECELERATION_FRICTION = 0.97;
var FRAME_MS = (1000 / 60);
