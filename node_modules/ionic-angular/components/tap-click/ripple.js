"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var activator_1 = require('./activator');
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var RippleActivator = (function (_super) {
    __extends(RippleActivator, _super);
    function RippleActivator(app, config) {
        _super.call(this, app, config);
    }
    RippleActivator.prototype.downAction = function (ev, activatableEle, startCoord) {
        var self = this;
        if (self.disableActivated(ev)) {
            return;
        }
        // queue to have this element activated
        self._queue.push(activatableEle);
        dom_1.nativeRaf(function () {
            for (var i = 0; i < self._queue.length; i++) {
                var queuedEle = self._queue[i];
                if (queuedEle && queuedEle.parentNode) {
                    self._active.push(queuedEle);
                    // DOM WRITE
                    queuedEle.classList.add(self._css);
                    var j = queuedEle.childElementCount;
                    while (j--) {
                        var rippleEle = queuedEle.children[j];
                        if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
                            // DOM WRITE
                            rippleEle.style.left = '-9999px';
                            rippleEle.style.opacity = '';
                            rippleEle.style[dom_1.CSS.transform] = 'scale(0.001) translateZ(0px)';
                            rippleEle.style[dom_1.CSS.transition] = '';
                            // DOM READ
                            var clientRect = activatableEle.getBoundingClientRect();
                            rippleEle.$top = clientRect.top;
                            rippleEle.$left = clientRect.left;
                            rippleEle.$width = clientRect.width;
                            rippleEle.$height = clientRect.height;
                            break;
                        }
                    }
                }
            }
            self._queue = [];
        });
    };
    RippleActivator.prototype.upAction = function (ev, activatableEle, startCoord) {
        var self = this;
        if (!dom_1.hasPointerMoved(6, startCoord, dom_1.pointerCoord(ev))) {
            var i = activatableEle.childElementCount;
            while (i--) {
                var rippleEle = activatableEle.children[i];
                if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
                    var clientPointerX = (startCoord.x - rippleEle.$left);
                    var clientPointerY = (startCoord.y - rippleEle.$top);
                    var x = Math.max(Math.abs(rippleEle.$width - clientPointerX), clientPointerX) * 2;
                    var y = Math.max(Math.abs(rippleEle.$height - clientPointerY), clientPointerY) * 2;
                    var diameter = Math.min(Math.max(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 64), 240);
                    if (activatableEle.hasAttribute('ion-item')) {
                        diameter = Math.min(diameter, 140);
                    }
                    var radius = Math.sqrt(rippleEle.$width + rippleEle.$height);
                    var scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260);
                    var opacityTransitionDuration = scaleTransitionDuration * 0.7;
                    var opacityTransitionDelay = scaleTransitionDuration - opacityTransitionDuration;
                    // DOM WRITE
                    rippleEle.style.width = rippleEle.style.height = diameter + 'px';
                    rippleEle.style.marginTop = rippleEle.style.marginLeft = -(diameter / 2) + 'px';
                    rippleEle.style.left = clientPointerX + 'px';
                    rippleEle.style.top = clientPointerY + 'px';
                    rippleEle.style.opacity = '0';
                    rippleEle.style[dom_1.CSS.transform] = 'scale(1) translateZ(0px)';
                    rippleEle.style[dom_1.CSS.transition] = 'transform ' +
                        scaleTransitionDuration +
                        'ms,opacity ' +
                        opacityTransitionDuration +
                        'ms ' +
                        opacityTransitionDelay + 'ms';
                }
            }
        }
        _super.prototype.upAction.call(this, ev, activatableEle, startCoord);
    };
    RippleActivator.prototype.deactivate = function () {
        // remove the active class from all active elements
        var self = this;
        self._queue = [];
        dom_1.rafFrames(2, function () {
            for (var i = 0; i < self._active.length; i++) {
                self._active[i].classList.remove(self._css);
            }
            self._active = [];
        });
    };
    return RippleActivator;
}(activator_1.Activator));
exports.RippleActivator = RippleActivator;
var TOUCH_DOWN_ACCEL = 300;
