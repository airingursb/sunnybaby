import { ElementRef } from '@angular/core';
/**
 * Base class for all Ionic components. Exposes some common functionality
 * that all Ionic components need, such as accessing underlying native elements and
 * sending/receiving app-level events.
 */
export declare class Ion {
    protected elementRef: ElementRef;
    private _id;
    constructor(elementRef: ElementRef);
    getElementRef(): ElementRef;
    getNativeElement(): any;
    getDimensions(): {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    width(): number;
    height(): number;
    ngOnDestroy(): void;
}
