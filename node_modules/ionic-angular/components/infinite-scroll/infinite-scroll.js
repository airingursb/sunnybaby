"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var content_1 = require('../content/content');
/**
 * @name InfiniteScroll
 * @description
 * The Infinite Scroll allows you to perform an action when the user
 * scrolls a specified distance from the bottom of the page.
 *
 * The expression assigned to the `infinite` event is called when
 * the user scrolls to the specified distance. When this expression
 * has finished its tasks, it should call the `complete()` method
 * on the infinite scroll instance.
 *
 * @usage
 * ```html
 * <ion-content>
 *
 *  <ion-list>
 *    <ion-item *ngFor="let i of items">{% raw %}{{i}}{% endraw %}</ion-item>
 *  </ion-list>
 *
 *  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
 *    <ion-infinite-scroll-content></ion-infinite-scroll-content>
 *  </ion-infinite-scroll>
 *
 * </ion-content>
 * ```
 *
 * ```ts
 * @Component({...})
 * export class NewsFeedPage {
 *   items = [];
 *
 *   constructor() {
 *     for (var i = 0; i < 30; i++) {
 *       this.items.push( this.items.length );
 *     }
 *   }
 *
 *   doInfinite(infiniteScroll) {
 *     console.log('Begin async operation');
 *
 *     setTimeout(() => {
 *       for (var i = 0; i < 30; i++) {
 *         this.items.push( this.items.length );
 *       }
 *
 *       console.log('Async operation has ended');
 *       infiniteScroll.complete();
 *     }, 500);
 *   }
 *
 * }
 * ```
 *
 *
 * ## Infinite Scroll Content
 *
 * By default, Ionic uses the infinite scroll spinner that looks
 * best for the platform the user is on. However, you can change the
 * default spinner or add text by adding properties to the
 * `ion-infinite-scroll-content` component.
 *
 *  ```html
 *  <ion-content>
 *
 *    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
 *      <ion-infinite-scroll-content
 *        loadingSpinner="bubbles"
 *        loadingText="Loading more data...">
 *      </ion-infinite-scroll-content>
 *    </ion-infinite-scroll>
 *
 *  </ion-content>
 *  ```
 *
 *
 * ## Further Customizing Infinite Scroll Content
 *
 * The `ion-infinite-scroll` component holds the infinite scroll logic.
 * It requires a child component in order to display the content.
 * Ionic uses `ion-infinite-scroll-content` by default. This component
 * displays the infinite scroll and changes the look depending
 * on the infinite scroll's state. Separating these components allows
 * developers to create their own infinite scroll content components.
 * You could replace our default content with custom SVG or CSS animations.
 *
 * @demo /docs/v2/demos/infinite-scroll/
 *
 */
var InfiniteScroll = (function () {
    function InfiniteScroll(_content, _zone, _elementRef) {
        this._content = _content;
        this._zone = _zone;
        this._elementRef = _elementRef;
        this._lastCheck = 0;
        this._highestY = 0;
        this._thr = '15%';
        this._thrPx = 0;
        this._thrPc = 0.15;
        this._init = false;
        this.state = STATE_ENABLED;
        /**
         * @output {event} The expression to call when the scroll reaches
         * the threshold distance. From within your infinite handler,
         * you must call the infinite scroll's `complete()` method when
         * your async operation has completed.
         */
        this.ionInfinite = new core_1.EventEmitter();
        _content.addCssClass('has-infinite-scroll');
    }
    Object.defineProperty(InfiniteScroll.prototype, "threshold", {
        /**
         * @input {string} The threshold distance from the bottom
         * of the content to call the `infinite` output event when scrolled.
         * The threshold value can be either a percent, or
         * in pixels. For example, use the value of `10%` for the `infinite`
         * output event to get called when the user has scrolled 10%
         * from the bottom of the page. Use the value `100px` when the
         * scroll is within 100 pixels from the bottom of the page.
         * Default is `15%`.
         */
        get: function () {
            return this._thr;
        },
        set: function (val) {
            this._thr = val;
            if (val.indexOf('%') > -1) {
                this._thrPx = 0;
                this._thrPc = (parseFloat(val) / 100);
            }
            else {
                this._thrPx = parseFloat(val);
                this._thrPc = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScroll.prototype._onScroll = function () {
        var _this = this;
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return 1;
        }
        var now = Date.now();
        if (this._lastCheck + 32 > now) {
            // no need to check less than every XXms
            return 2;
        }
        this._lastCheck = now;
        var infiniteHeight = this._elementRef.nativeElement.scrollHeight;
        if (!infiniteHeight) {
            // if there is no height of this element then do nothing
            return 3;
        }
        var d = this._content.getContentDimensions();
        var reloadY = d.contentHeight;
        if (this._thrPc) {
            reloadY += (reloadY * this._thrPc);
        }
        else {
            reloadY += this._thrPx;
        }
        var distanceFromInfinite = ((d.scrollHeight - infiniteHeight) - d.scrollTop) - reloadY;
        if (distanceFromInfinite < 0) {
            this._zone.run(function () {
                if (_this.state !== STATE_LOADING && _this.state !== STATE_DISABLED) {
                    _this.state = STATE_LOADING;
                    _this.ionInfinite.emit(_this);
                }
            });
            return 5;
        }
        return 6;
    };
    /**
     * Call `complete()` within the `infinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     */
    InfiniteScroll.prototype.complete = function () {
        this.state = STATE_ENABLED;
    };
    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param {boolean} shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    InfiniteScroll.prototype.enable = function (shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    };
    InfiniteScroll.prototype._setListeners = function (shouldListen) {
        var _this = this;
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(function () {
                        _this._scLsn = _this._content.addScrollListener(_this._onScroll.bind(_this));
                    });
                }
            }
            else {
                this._scLsn && this._scLsn();
                this._scLsn = null;
            }
        }
    };
    /**
     * @private
     */
    InfiniteScroll.prototype.ngAfterContentInit = function () {
        this._init = true;
        this._setListeners(this.state !== STATE_DISABLED);
    };
    /**
     * @private
     */
    InfiniteScroll.prototype.ngOnDestroy = function () {
        this._setListeners(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InfiniteScroll.prototype, "threshold", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InfiniteScroll.prototype, "ionInfinite", void 0);
    InfiniteScroll = __decorate([
        core_1.Directive({
            selector: 'ion-infinite-scroll'
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [content_1.Content, core_1.NgZone, core_1.ElementRef])
    ], InfiniteScroll);
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
var STATE_ENABLED = 'enabled';
var STATE_DISABLED = 'disabled';
var STATE_LOADING = 'loading';
