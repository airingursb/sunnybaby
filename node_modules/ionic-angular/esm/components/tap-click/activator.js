var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { nativeTimeout, rafFrames } from '../../util/dom';
export var Activator = function () {
    function Activator(app, config) {
        _classCallCheck(this, Activator);

        this.app = app;
        this._queue = [];
        this._active = [];
        this._css = config.get('activatedClass') || 'activated';
    }

    _createClass(Activator, [{
        key: 'downAction',
        value: function downAction(ev, activatableEle, startCoord) {
            // the user just pressed down
            var self = this;
            if (self.disableActivated(ev)) {
                return;
            }
            // queue to have this element activated
            self._queue.push(activatableEle);
            rafFrames(2, function () {
                var activatableEle = void 0;
                for (var i = 0; i < self._queue.length; i++) {
                    activatableEle = self._queue[i];
                    if (activatableEle && activatableEle.parentNode) {
                        self._active.push(activatableEle);
                        activatableEle.classList.add(self._css);
                    }
                }
                self._queue = [];
            });
        }
    }, {
        key: 'upAction',
        value: function upAction(ev, activatableEle, startCoord) {
            var _this = this;

            // the user was pressing down, then just let up
            rafFrames(CLEAR_STATE_DEFERS, function () {
                _this.clearState();
            });
        }
    }, {
        key: 'clearState',
        value: function clearState() {
            var _this2 = this;

            // all states should return to normal
            if (!this.app.isEnabled()) {
                // the app is actively disabled, so don't bother deactivating anything.
                // this makes it easier on the GPU so it doesn't have to redraw any
                // buttons during a transition. This will retry in XX milliseconds.
                nativeTimeout(function () {
                    _this2.clearState();
                }, 600);
            } else {
                // not actively transitioning, good to deactivate any elements
                this.deactivate();
            }
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            // remove the active class from all active elements
            var self = this;
            self._queue = [];
            rafFrames(2, function () {
                for (var i = 0; i < self._active.length; i++) {
                    self._active[i].classList.remove(self._css);
                }
                self._active = [];
            });
        }
    }, {
        key: 'disableActivated',
        value: function disableActivated(ev) {
            if (ev.defaultPrevented) return true;
            var targetEle = ev.target;
            for (var x = 0; x < 4; x++) {
                if (!targetEle) break;
                if (targetEle.hasAttribute('disable-activated')) return true;
                targetEle = targetEle.parentElement;
            }
            return false;
        }
    }]);

    return Activator;
}();
var CLEAR_STATE_DEFERS = 5;