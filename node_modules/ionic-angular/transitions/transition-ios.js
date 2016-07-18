"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animation_1 = require('../animations/animation');
var page_transition_1 = require('./page-transition');
var DURATION = 500;
var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
var OPACITY = 'opacity';
var TRANSLATEX = 'translateX';
var OFF_RIGHT = '99.5%';
var OFF_LEFT = '-33%';
var CENTER = '0%';
var OFF_OPACITY = 0.8;
var SHOW_BACK_BTN_CSS = 'show-back-button';
var IOSTransition = (function (_super) {
    __extends(IOSTransition, _super);
    function IOSTransition(enteringView, leavingView, opts) {
        _super.call(this, enteringView, leavingView, opts);
        this.duration(opts.duration || DURATION);
        this.easing(opts.easing || EASING);
        // what direction is the transition going
        var backDirection = (opts.direction === 'back');
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content
        var enteringContent = new animation_1.Animation(enteringView.contentRef());
        enteringContent.element(enteringView.toolbarRefs());
        this.add(enteringContent);
        if (backDirection) {
            // entering content, back direction
            enteringContent
                .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
                .fromTo(OPACITY, OFF_OPACITY, 1, true);
        }
        else {
            // entering content, forward direction
            enteringContent
                .before.clearStyles([OPACITY])
                .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
        }
        if (enteringHasNavbar) {
            // entering page has a navbar
            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            this.add(enteringNavBar);
            var enteringTitle = new animation_1.Animation(enteringView.titleRef());
            var enteringNavbarItems = new animation_1.Animation(enteringView.navbarItemRefs());
            var enteringNavbarBg = new animation_1.Animation(enteringView.navbarBgRef());
            var enteringBackButton = new animation_1.Animation(enteringView.backBtnRef());
            enteringNavBar
                .add(enteringTitle)
                .add(enteringNavbarItems)
                .add(enteringNavbarBg)
                .add(enteringBackButton);
            enteringTitle.fromTo(OPACITY, 0.01, 1, true);
            enteringNavbarItems.fromTo(OPACITY, 0.01, 1, true);
            // set properties depending on direction
            if (backDirection) {
                // entering navbar, back direction
                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true);
                if (enteringView.enableBack()) {
                    // back direction, entering page has a back button
                    enteringBackButton
                        .before.addClass(SHOW_BACK_BTN_CSS)
                        .fromTo(OPACITY, 0.01, 1, true);
                }
            }
            else {
                // entering navbar, forward direction
                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                if (leavingHasNavbar) {
                    // entering navbar, forward direction, and there's a leaving navbar
                    // should just fade in, no sliding
                    enteringNavbarBg
                        .before.clearStyles([TRANSLATEX])
                        .fromTo(OPACITY, 0.01, 1, true);
                }
                else {
                    // entering navbar, forward direction, and there's no leaving navbar
                    // should just slide in, no fading in
                    enteringNavbarBg
                        .before.clearStyles([OPACITY])
                        .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                }
                if (enteringView.enableBack()) {
                    // forward direction, entering page has a back button
                    enteringBackButton
                        .before.addClass(SHOW_BACK_BTN_CSS)
                        .fromTo(OPACITY, 0.01, 1, true);
                    var enteringBackBtnText = new animation_1.Animation(enteringView.backBtnTextRef());
                    enteringBackBtnText.fromTo(TRANSLATEX, '100px', '0px');
                    enteringNavBar.add(enteringBackBtnText);
                }
                else {
                    enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
                }
            }
        }
        // setup leaving view
        if (leavingView) {
            // leaving content
            var leavingContent = new animation_1.Animation(leavingView.contentRef());
            leavingContent.element(leavingView.toolbarRefs());
            this.add(leavingContent);
            if (backDirection) {
                // leaving content, back direction
                leavingContent
                    .before.clearStyles([OPACITY])
                    .fromTo(TRANSLATEX, CENTER, '100%');
            }
            else {
                // leaving content, forward direction
                leavingContent
                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                    .fromTo(OPACITY, 1, OFF_OPACITY);
            }
            if (leavingHasNavbar) {
                // leaving page has a navbar
                var leavingNavBar = new animation_1.Animation(leavingView.navbarRef());
                var leavingBackButton = new animation_1.Animation(leavingView.backBtnRef());
                var leavingTitle = new animation_1.Animation(leavingView.titleRef());
                var leavingNavbarItems = new animation_1.Animation(leavingView.navbarItemRefs());
                var leavingNavbarBg = new animation_1.Animation(leavingView.navbarBgRef());
                leavingNavBar
                    .add(leavingBackButton)
                    .add(leavingTitle)
                    .add(leavingNavbarItems)
                    .add(leavingNavbarBg);
                this.add(leavingNavBar);
                // fade out leaving navbar items
                leavingBackButton.fromTo(OPACITY, 0.99, 0);
                leavingTitle.fromTo(OPACITY, 0.99, 0);
                leavingNavbarItems.fromTo(OPACITY, 0.99, 0);
                if (backDirection) {
                    // leaving navbar, back direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, '100%');
                    if (enteringHasNavbar) {
                        // leaving navbar, back direction, and there's an entering navbar
                        // should just fade out, no sliding
                        leavingNavbarBg
                            .before.clearStyles([TRANSLATEX])
                            .fromTo('opacity', 0.99, 0);
                    }
                    else {
                        // leaving navbar, back direction, and there's no entering navbar
                        // should just slide out, no fading out
                        leavingNavbarBg
                            .before.clearStyles([OPACITY])
                            .fromTo(TRANSLATEX, CENTER, '100%');
                    }
                    var leavingBackBtnText = new animation_1.Animation(leavingView.backBtnTextRef());
                    leavingBackBtnText.fromTo(TRANSLATEX, CENTER, (300) + 'px');
                    leavingNavBar.add(leavingBackBtnText);
                }
                else {
                    // leaving navbar, forward direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, OFF_LEFT);
                }
            }
        }
    }
    return IOSTransition;
}(page_transition_1.PageTransition));
page_transition_1.PageTransition.register('ios-transition', IOSTransition);
