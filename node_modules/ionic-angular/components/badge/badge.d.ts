import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
/**
  * @name Badge
  * @module ionic
  * @description
  * Badges are simple components in Ionic containing numbers or text. You can display a badge to indicate that there is new information associated with the item it is on.
  * @see {@link /docs/v2/components/#badges Badges Component Docs}

 */
export declare class Badge {
    private _elementRef;
    private _renderer;
    constructor(config: Config, _elementRef: ElementRef, _renderer: Renderer);
    /**
     * @private
     */
    private _readAttrs(element);
    /**
     * @private
     */
    private _setClass(color);
}
