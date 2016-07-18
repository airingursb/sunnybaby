"use strict";
var Debouncer = (function () {
    function Debouncer(wait) {
        this.wait = wait;
        this.timer = null;
    }
    Debouncer.prototype.debounce = function (callback) {
        this.callback = callback;
        this.schedule();
    };
    Debouncer.prototype.schedule = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.wait <= 0) {
            this.callback();
        }
        else {
            this.timer = setTimeout(this.callback, this.wait);
        }
    };
    return Debouncer;
}());
exports.Debouncer = Debouncer;
