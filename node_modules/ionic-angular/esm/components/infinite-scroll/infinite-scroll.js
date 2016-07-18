var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { Directive, ElementRef, EventEmitter, Host, Input, NgZone, Output } from '@angular/core';
import { Content } from '../content/content';
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
export var InfiniteScroll = function () {
    function InfiniteScroll(_content, _zone, _elementRef) {
        _classCallCheck(this, InfiniteScroll);

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
        this.ionInfinite = new EventEmitter();
        _content.addCssClass('has-infinite-scroll');
    }
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


    _createClass(InfiniteScroll, [{
        key: "_onScroll",
        value: function _onScroll() {
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
                reloadY += reloadY * this._thrPc;
            } else {
                reloadY += this._thrPx;
            }
            var distanceFromInfinite = d.scrollHeight - infiniteHeight - d.scrollTop - reloadY;
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
        }
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

    }, {
        key: "complete",
        value: function complete() {
            this.state = STATE_ENABLED;
        }
        /**
         * Call `enable(false)` to disable the infinite scroll from actively
         * trying to receive new data while scrolling. This method is useful
         * when it is known that there is no more data that can be added, and
         * the infinite scroll is no longer needed.
         * @param {boolean} shouldEnable  If the infinite scroll should be
         * enabled or not. Setting to `false` will remove scroll event listeners
         * and hide the display.
         */

    }, {
        key: "enable",
        value: function enable(shouldEnable) {
            this.state = shouldEnable ? STATE_ENABLED : STATE_DISABLED;
            this._setListeners(shouldEnable);
        }
    }, {
        key: "_setListeners",
        value: function _setListeners(shouldListen) {
            var _this2 = this;

            if (this._init) {
                if (shouldListen) {
                    if (!this._scLsn) {
                        this._zone.runOutsideAngular(function () {
                            _this2._scLsn = _this2._content.addScrollListener(_this2._onScroll.bind(_this2));
                        });
                    }
                } else {
                    this._scLsn && this._scLsn();
                    this._scLsn = null;
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            this._init = true;
            this._setListeners(this.state !== STATE_DISABLED);
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._setListeners(false);
        }
    }, {
        key: "threshold",
        get: function get() {
            return this._thr;
        },
        set: function set(val) {
            this._thr = val;
            if (val.indexOf('%') > -1) {
                this._thrPx = 0;
                this._thrPc = parseFloat(val) / 100;
            } else {
                this._thrPx = parseFloat(val);
                this._thrPc = 0;
            }
        }
    }]);

    return InfiniteScroll;
}();
__decorate([Input(), __metadata('design:type', String)], InfiniteScroll.prototype, "threshold", null);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], InfiniteScroll.prototype, "ionInfinite", void 0);
InfiniteScroll = __decorate([Directive({
    selector: 'ion-infinite-scroll'
}), __param(0, Host()), __metadata('design:paramtypes', [typeof (_b = typeof Content !== 'undefined' && Content) === 'function' && _b || Object, typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c || Object, typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d || Object])], InfiniteScroll);
var STATE_ENABLED = 'enabled';
var STATE_DISABLED = 'disabled';
var STATE_LOADING = 'loading';
var _a, _b, _c, _d;