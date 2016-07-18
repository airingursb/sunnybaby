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
import { Directive, HostListener, Input } from '@angular/core';
import { MenuController } from './menu-controller';
/**
 * @name MenuClose
 * @description
 * The `menuClose` directive can be placed on any button to close an open menu.
 *
 * @usage
 *
 * A simple `menuClose` button can be added using the following markup:
 *
 * ```html
 * <button menuClose>Close Menu</button>
 * ```
 *
 * To close a certain menu by its id or side, give the `menuClose`
 * directive a value.
 *
 * ```html
 * <button menuClose="left">Close Left Menu</button>
 * ```
 *
 * @demo /docs/v2/demos/menu/
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link ../../menu/Menu Menu API Docs}
 */
export var MenuClose = function () {
    function MenuClose(_menu) {
        _classCallCheck(this, MenuClose);

        this._menu = _menu;
    }
    /**
    * @private
    */


    _createClass(MenuClose, [{
        key: "close",
        value: function close() {
            var menu = this._menu.get(this.menuClose);
            menu && menu.close();
        }
    }]);

    return MenuClose;
}();
__decorate([Input(), __metadata('design:type', String)], MenuClose.prototype, "menuClose", void 0);
__decorate([HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], MenuClose.prototype, "close", null);
MenuClose = __decorate([Directive({
    selector: '[menuClose]'
}), __metadata('design:paramtypes', [typeof (_a = typeof MenuController !== 'undefined' && MenuController) === 'function' && _a || Object])], MenuClose);
var _a;