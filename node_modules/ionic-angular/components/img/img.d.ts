import { ElementRef, NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export declare class Img {
    private _elementRef;
    private _platform;
    private _zone;
    private _src;
    private _normalizeSrc;
    private _imgs;
    private _w;
    private _h;
    private _enabled;
    private _init;
    constructor(_elementRef: ElementRef, _platform: Platform, _zone: NgZone);
    src: string;
    ngOnInit(): void;
    private _update();
    private _loaded(isLoaded);
    enable(shouldEnable: boolean): void;
    width: string | number;
    height: string | number;
    alt: string;
    title: string;
    _width: string;
    _height: string;
}
