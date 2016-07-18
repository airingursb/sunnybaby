import { NgZone } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
/**
 * @private
 */
export declare class TapClick {
    private app;
    private lastTouch;
    private disableClick;
    private lastActivated;
    private usePolyfill;
    private activator;
    private startCoord;
    private pointerMove;
    constructor(config: Config, app: App, zone: NgZone);
    touchStart(ev: UIEvent): void;
    touchEnd(ev: UIEvent): void;
    mouseDown(ev: any): void;
    mouseUp(ev: any): void;
    pointerStart(ev: any): void;
    pointerEnd(ev: any): void;
    pointerCancel(ev: UIEvent): void;
    moveListeners(shouldAdd: boolean): void;
    click(ev: any): void;
    isDisabledNativeClick(): boolean;
}
/**
 * @private
 */
export declare const isActivatable: (ele: HTMLElement) => boolean;
