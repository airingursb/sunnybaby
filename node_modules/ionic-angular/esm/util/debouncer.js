var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var Debouncer = function () {
    function Debouncer(wait) {
        _classCallCheck(this, Debouncer);

        this.wait = wait;
        this.timer = null;
    }

    _createClass(Debouncer, [{
        key: "debounce",
        value: function debounce(callback) {
            this.callback = callback;
            this.schedule();
        }
    }, {
        key: "schedule",
        value: function schedule() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            if (this.wait <= 0) {
                this.callback();
            } else {
                this.timer = setTimeout(this.callback, this.wait);
            }
        }
    }]);

    return Debouncer;
}();