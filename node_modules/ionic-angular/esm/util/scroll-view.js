var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { CSS, pointerCoord, nativeRaf, cancelRaf } from '../util/dom';
export var ScrollView = function () {
    function ScrollView(ele) {
        _classCallCheck(this, ScrollView);

        this._js = false;
        this._top = 0;
        this._el = ele;
    }

    _createClass(ScrollView, [{
        key: 'getTop',
        value: function getTop() {
            if (this._js) {
                return this._top;
            }
            return this._top = this._el.scrollTop;
        }
    }, {
        key: 'setTop',
        value: function setTop(top) {
            this._top = top;
            if (this._js) {
                this._el.style[CSS.transform] = 'translate3d(0px,' + top * -1 + 'px,0px)';
            } else {
                this._el.scrollTop = top;
            }
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo(x, y, duration) {
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
            var maxAttempts = duration / 16 + 100;
            return new Promise(function (resolve) {
                var startTime = void 0;
                var attempts = 0;
                // scroll loop
                function step() {
                    attempts++;
                    if (!self._el || !self.isPlaying || attempts > maxAttempts) {
                        self.isPlaying = false;
                        resolve();
                        return;
                    }
                    var time = Math.min(1, (Date.now() - startTime) / duration);
                    // where .5 would be 50% of time on a linear scale easedT gives a
                    // fraction based on the easing method
                    var easedT = --time * time * time + 1;
                    if (fromY !== y) {
                        self.setTop(easedT * (y - fromY) + fromY);
                    }
                    if (fromX !== x) {
                        self._el.scrollLeft = Math.floor(easedT * (x - fromX) + fromX);
                    }
                    if (easedT < 1) {
                        nativeRaf(step);
                    } else {
                        // done
                        resolve();
                    }
                }
                // start scroll loop
                self.isPlaying = true;
                // chill out for a frame first
                nativeRaf(function () {
                    startTime = Date.now();
                    nativeRaf(step);
                });
            });
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop(duration) {
            return this.scrollTo(0, 0, duration);
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom(duration) {
            var y = 0;
            if (this._el) {
                y = this._el.scrollHeight - this._el.clientHeight;
            }
            return this.scrollTo(0, y, duration);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.isPlaying = false;
        }
        /**
         * @private
         * JS Scrolling has been provided only as a temporary solution
         * until iOS apps can take advantage of scroll events at all times.
         * The goal is to eventually remove JS scrolling entirely. This
         * method may be removed in the future.
         */

    }, {
        key: 'jsScroll',
        value: function jsScroll(onScrollCallback) {
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
        }
        /**
         * @private
         * Used for JS scrolling. May be removed in the future.
         */

    }, {
        key: '_start',
        value: function _start(ev) {
            this._velocity = 0;
            this._pos.length = 0;
            this._max = null;
            this._pos.push(pointerCoord(ev).y, Date.now());
        }
        /**
         * @private
         * Used for JS scrolling. May be removed in the future.
         */

    }, {
        key: '_move',
        value: function _move(ev) {
            if (this._pos.length) {
                var y = pointerCoord(ev).y;
                // ******** DOM READ ****************
                this._setMax();
                this._top -= y - this._pos[this._pos.length - 2];
                this._top = Math.min(Math.max(this._top, 0), this._max);
                this._pos.push(y, Date.now());
                // ******** DOM READ THEN DOM WRITE ****************
                this._cb(this._top);
                // ******** DOM WRITE ****************
                this.setTop(this._top);
            }
        }
        /**
         * @private
         * Used for JS scrolling. May be removed in the future.
         */

    }, {
        key: '_setMax',
        value: function _setMax() {
            if (!this._max) {
                // ******** DOM READ ****************
                this._max = this._el.offsetHeight - this._el.parentElement.offsetHeight + this._el.parentElement.offsetTop;
            }
        }
        /**
         * @private
         * Used for JS scrolling. May be removed in the future.
         */

    }, {
        key: '_end',
        value: function _end(ev) {
            // figure out what the scroll position was about 100ms ago
            var positions = this._pos;
            this._velocity = 0;
            cancelRaf(this._rafId);
            if (!positions.length) return;
            var y = pointerCoord(ev).y;
            positions.push(y, Date.now());
            var endPos = positions.length - 1;
            var startPos = endPos;
            var timeRange = Date.now() - 100;
            // move pointer to position measured 100ms ago
            for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 2) {
                startPos = i;
            }
            if (startPos !== endPos) {
                // compute relative movement between these two points
                var timeOffset = positions[endPos] - positions[startPos];
                var movedTop = positions[startPos - 1] - positions[endPos - 1];
                // based on XXms compute the movement to apply for each render step
                this._velocity = movedTop / timeOffset * FRAME_MS;
                // verify that we have enough velocity to start deceleration
                if (Math.abs(this._velocity) > MIN_VELOCITY_START_DECELERATION) {
                    // ******** DOM READ ****************
                    this._setMax();
                    this._rafId = nativeRaf(this._decelerate.bind(this));
                }
            }
            positions.length = 0;
        }
        /**
         * @private
         * Used for JS scrolling. May be removed in the future.
         */

    }, {
        key: '_decelerate',
        value: function _decelerate() {
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
                    self._rafId = nativeRaf(self._decelerate.bind(self));
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._velocity = 0;
            this.stop();
            this._el = null;
        }
    }]);

    return ScrollView;
}();
var MAX_VELOCITY = 150;
var MIN_VELOCITY_START_DECELERATION = 4;
var MIN_VELOCITY_CONTINUE_DECELERATION = 0.12;
var DECELERATION_FRICTION = 0.97;
var FRAME_MS = 1000 / 60;