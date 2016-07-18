var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { defaults, assign } from '../util';
import { Hammer, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './hammer';
/**
 * @private
 * A gesture recognizer class.
 *
 * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
 */
export var Gesture = function () {
    function Gesture(element) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Gesture);

        this._callbacks = {};
        this.isListening = false;
        defaults(opts, {
            domEvents: true
        });
        this.element = element;
        // Map 'x' or 'y' string to hammerjs opts
        this.direction = opts.direction || 'x';
        opts.direction = this.direction === 'x' ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL;
        this._options = opts;
    }

    _createClass(Gesture, [{
        key: 'options',
        value: function options(opts) {
            assign(this._options, opts);
        }
    }, {
        key: 'on',
        value: function on(type, cb) {
            if (type === 'pinch' || type === 'rotate') {
                this._hammer.get('pinch').set({ enable: true });
            }
            this._hammer.on(type, cb);
            (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
        }
    }, {
        key: 'off',
        value: function off(type, cb) {
            this._hammer.off(type, this._callbacks[type] ? cb : null);
        }
    }, {
        key: 'listen',
        value: function listen() {
            if (!this.isListening) {
                this._hammer = Hammer(this.element, this._options);
            }
            this.isListening = true;
        }
    }, {
        key: 'unlisten',
        value: function unlisten() {
            var eventType = void 0;
            var i = void 0;
            if (this._hammer && this.isListening) {
                for (eventType in this._callbacks) {
                    for (i = 0; i < this._callbacks[eventType].length; i++) {
                        this._hammer.off(eventType, this._callbacks[eventType]);
                    }
                }
                this._hammer.destroy();
            }
            this._callbacks = {};
            this._hammer = null;
            this.isListening = false;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.unlisten();
            this.element = this._options = null;
        }
    }]);

    return Gesture;
}();