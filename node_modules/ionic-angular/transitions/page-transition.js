"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animation_1 = require('../animations/animation');
var content_1 = require('../components/content/content');
var transition_1 = require('./transition');
/**
 * @private
 */
var PageTransition = (function (_super) {
    __extends(PageTransition, _super);
    function PageTransition(enteringView, leavingView, opts) {
        _super.call(this, enteringView, leavingView, opts);
        this.enteringPage = new animation_1.Animation(this.enteringView.pageRef());
        this.enteringPage.before.addClass('show-page');
        this.add(this.enteringPage);
        this.before.addDomReadFn(this.readDimensions.bind(this));
        this.before.addDomWriteFn(this.writeDimensions.bind(this));
    }
    /**
     * DOM READ
     */
    PageTransition.prototype.readDimensions = function () {
        var content = this.enteringView.getContent();
        if (content && content instanceof content_1.Content) {
            content.readDimensions();
        }
    };
    /**
     * DOM WRITE
     */
    PageTransition.prototype.writeDimensions = function () {
        var content = this.enteringView.getContent();
        if (content && content instanceof content_1.Content) {
            content.writeDimensions();
        }
    };
    PageTransition.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.enteringView = this.enteringPage = null;
    };
    return PageTransition;
}(transition_1.Transition));
exports.PageTransition = PageTransition;
function parsePxUnit(val) {
    return (val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
}
