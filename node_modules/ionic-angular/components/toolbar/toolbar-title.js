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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var ion_1 = require('../ion');
var navbar_1 = require('../navbar/navbar');
var toolbar_1 = require('./toolbar');
/**
 * @name Title
 * @description
 * `ion-title` is a component that sets the title of the `Toolbar` or `Navbar`
 *
 * @usage
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-title>Settings</ion-title>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * Or to create a navbar with a toolbar as a subheader:
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-title>Main Heder</ion-title>
 *   </ion-navbar>
 *
 *   <ion-toolbar>
 *     <ion-title>Subheader</ion-title>
 *   </ion-toolbar>
 *
 * </ion-header>
 * ```
 *
 * @demo /docs/v2/demos/title/
 */
var ToolbarTitle = (function (_super) {
    __extends(ToolbarTitle, _super);
    function ToolbarTitle(_elementRef, toolbar, navbar) {
        _super.call(this, _elementRef);
        this._elementRef = _elementRef;
        toolbar && toolbar.setTitleCmp(this);
        navbar && navbar.setTitleCmp(this);
    }
    /**
     * @private
     */
    ToolbarTitle.prototype.getTitleText = function () {
        return this._elementRef.nativeElement.textContent;
    };
    ToolbarTitle = __decorate([
        core_1.Component({
            selector: 'ion-title',
            template: '<div class="toolbar-title">' +
                '<ng-content></ng-content>' +
                '</div>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, toolbar_1.Toolbar, navbar_1.Navbar])
    ], ToolbarTitle);
    return ToolbarTitle;
}(ion_1.Ion));
exports.ToolbarTitle = ToolbarTitle;
