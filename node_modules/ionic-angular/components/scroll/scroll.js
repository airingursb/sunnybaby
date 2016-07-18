"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ion_1 = require('../ion');
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * @usage
 * ```html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * ```
 *@property {boolean} [scrollX] - whether to enable scrolling along the X axis
 *@property {boolean} [scrollY] - whether to enable scrolling along the Y axis
 *@property {boolean} [zoom] - whether to enable zooming
 *@property {number} [maxZoom] - set the max zoom amount for ion-scroll
 * @demo /docs/v2/demos/scroll/
 */
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(elementRef) {
        _super.call(this, elementRef);
        /**
         * @private
         */
        this.maxScale = 3;
        /**
         * @private
         */
        this.zoomDuration = 250;
    }
    /**
     * @private
     */
    Scroll.prototype.ngOnInit = function () {
        this.scrollElement = this.getNativeElement().children[0];
    };
    /**
     * @private
     * Add a scroll event handler to the scroll element if it exists.
     * @param {Function} handler  The scroll handler to add to the scroll element.
     * @returns {?Function} a function to remove the specified handler, otherwise
     * undefined if the scroll element doesn't exist.
     */
    Scroll.prototype.addScrollEventListener = function (handler) {
        var _this = this;
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return function () {
            _this.scrollElement.removeEventListener('scroll', handler);
        };
    };
    Scroll = __decorate([
        core_1.Component({
            selector: 'ion-scroll',
            inputs: [
                'scrollX', 'scrollY', 'zoom', 'maxZoom'
            ],
            host: {
                '[class.scroll-x]': 'scrollX',
                '[class.scroll-y]': 'scrollY'
            },
            template: '<scroll-content>' +
                '<div class="scroll-zoom-wrapper">' +
                '<ng-content></ng-content>' +
                '</div>' +
                '</scroll-content>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Scroll);
    return Scroll;
}(ion_1.Ion));
exports.Scroll = Scroll;
