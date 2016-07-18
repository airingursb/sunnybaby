import { ElementRef } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from './toolbar';
/**
 * @private
 */
export declare class ToolbarItem {
    inToolbar: boolean;
    constructor(elementRef: ElementRef, toolbar: Toolbar, navbar: Navbar);
    _buttons: any;
}
