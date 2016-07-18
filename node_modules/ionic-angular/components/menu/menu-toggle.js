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
var menu_controller_1 = require('./menu-controller');
var navbar_1 = require('../navbar/navbar');
var view_controller_1 = require('../nav/view-controller');
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
var MenuToggle = (function () {
    function MenuToggle(_menu, elementRef, _viewCtrl, _navbar) {
        this._menu = _menu;
        this._viewCtrl = _viewCtrl;
        this._navbar = _navbar;
        this._inNavbar = !!_navbar;
    }
    /**
    * @private
    */
    MenuToggle.prototype.toggle = function () {
        var menu = this._menu.get(this.menuToggle);
        menu && menu.toggle();
    };
    Object.defineProperty(MenuToggle.prototype, "isHidden", {
        /**
        * @private
        */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuToggle.prototype, "menuToggle", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MenuToggle.prototype, "toggle", null);
    MenuToggle = __decorate([
        core_1.Directive({
            selector: '[menuToggle]',
            host: {
                '[hidden]': 'isHidden',
                'menuToggle': '' // ensures the attr is there for css when using [menuToggle]
            }
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [menu_controller_1.MenuController, core_1.ElementRef, view_controller_1.ViewController, navbar_1.Navbar])
    ], MenuToggle);
    return MenuToggle;
}());
exports.MenuToggle = MenuToggle;
