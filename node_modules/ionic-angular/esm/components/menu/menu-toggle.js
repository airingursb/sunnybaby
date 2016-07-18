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
import { Directive, ElementRef, Input, HostListener, Optional } from '@angular/core';
import { MenuController } from './menu-controller';
import { Navbar } from '../navbar/navbar';
import { ViewController } from '../nav/view-controller';
/**
 * @name MenuToggle
 * @description
 * The `menuToggle` directive can be placed on any button to toggle a menu open or closed.
 * If it is added to the [NavBar](../../nav/NavBar) of a page, the button will only appear
 * when the page it's in is currently a root page. See the [Menu Navigation Bar Behavior](../Menu#navigation-bar-behavior)
 * docs for more information.
 *
 *
 * @usage
 *
 * A simple `menuToggle` button can be added using the following markup:
 *
 * ```html
 * <button menuToggle>Toggle Menu</button>
 * ```
 *
 * To toggle a specific menu by its id or side, give the `menuToggle`
 * directive a value.
 *
 * ```html
 * <button menuToggle="right">Toggle Right Menu</button>
 * ```
 *
 * If placing the `menuToggle` in a navbar or toolbar, it should be
 * placed as a child of the `<ion-navbar>` or `<ion-toolbar>`, and not in
 * the `<ion-buttons>` element:
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-buttons start>
 *       <button>
 *         <ion-icon name="contact"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *     <button menuToggle>
 *       <ion-icon name="menu"></ion-icon>
 *     </button>
 *     <ion-title>
 *       Title
 *     </ion-title>
 *     <ion-buttons end>
 *       <button (click)="doClick()">
 *         <ion-icon name="more"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * Similar to `<ion-buttons>`, the `menuToggle` can be positioned using
 * `start`, `end`, `left`, or `right`:
 *
 * ```html
 * <ion-toolbar>
 *   <button menuToggle right>
 *     <ion-icon name="menu"></ion-icon>
 *   </button>
 *   <ion-title>
 *     Title
 *   </ion-title>
 *   <ion-buttons end>
 *     <button (click)="doClick()">
 *       <ion-icon name="more"></ion-icon>
 *     </button>
 *   </ion-buttons>
 * </ion-toolbar>
 * ```
 *
 * See the [Toolbar API docs](../../toolbar/Toolbar) for more information
 * on the different positions.
 *
 * @demo /docs/v2/demos/menu/
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link ../../menu/Menu Menu API Docs}
 */
export var MenuToggle = function () {
    function MenuToggle(_menu, elementRef, _viewCtrl, _navbar) {
        _classCallCheck(this, MenuToggle);

        this._menu = _menu;
        this._viewCtrl = _viewCtrl;
        this._navbar = _navbar;
        this._inNavbar = !!_navbar;
    }
    /**
    * @private
    */


    _createClass(MenuToggle, [{
        key: "toggle",
        value: function toggle() {
            var menu = this._menu.get(this.menuToggle);
            menu && menu.toggle();
        }
        /**
        * @private
        */

    }, {
        key: "isHidden",
        get: function get() {
            if (this._inNavbar && this._viewCtrl) {
                if (this._viewCtrl.isFirst()) {
                    // this is the first view, so it should always show
                    return false;
                }
                var menu = this._menu.get(this.menuToggle);
                if (menu) {
                    // this is not the root view, so see if this menu
                    // is configured to still be enabled if it's not the root view
                    return !menu.persistent;
                }
            }
            return false;
        }
    }]);

    return MenuToggle;
}();
__decorate([Input(), __metadata('design:type', String)], MenuToggle.prototype, "menuToggle", void 0);
__decorate([HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], MenuToggle.prototype, "toggle", null);
MenuToggle = __decorate([Directive({
    selector: '[menuToggle]',
    host: {
        '[hidden]': 'isHidden',
        'menuToggle': '' // ensures the attr is there for css when using [menuToggle]
    }
}), __param(2, Optional()), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof MenuController !== 'undefined' && MenuController) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c || Object, typeof (_d = typeof Navbar !== 'undefined' && Navbar) === 'function' && _d || Object])], MenuToggle);
var _a, _b, _c, _d;