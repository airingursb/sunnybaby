export declare const nativeRaf: any;
export declare const raf: any;
export declare const cancelRaf: any;
export declare const nativeTimeout: any;
export declare const clearNativeTimeout: any;
export declare function rafFrames(framesToWait: number, callback: Function): void;
export declare let CSS: {
    transform?: string;
    transition?: string;
    transitionDuration?: string;
    transitionDelay?: string;
    transitionTimingFn?: string;
    transitionStart?: string;
    transitionEnd?: string;
    transformOrigin?: string;
};
export declare function transitionEnd(el: HTMLElement, callback: Function): () => void;
export declare function ready(callback?: Function): Promise<any>;
export declare function windowLoad(callback?: Function): Promise<any>;
export declare function pointerCoord(ev: any): Coordinates;
export declare function hasPointerMoved(threshold: number, startCoord: Coordinates, endCoord: Coordinates): boolean;
export declare function isActive(ele: HTMLElement): boolean;
export declare function hasFocus(ele: HTMLElement): boolean;
export declare function isTextInput(ele: any): boolean;
export declare function hasFocusedTextInput(): boolean;
export declare function copyInputAttributes(srcElement: HTMLElement, destElement: HTMLElement): void;
export declare function closest(ele: HTMLElement, selector: string, checkSelf?: boolean): HTMLElement;
/**
 * Get the element offsetWidth and offsetHeight. Values are cached
 * to reduce DOM reads. Cache is cleared on a window resize.
 */
export declare function getDimensions(ele: HTMLElement, id: string): {
    width: number;
    height: number;
    left: number;
    top: number;
};
export declare function clearDimensions(id: string): void;
export declare function windowDimensions(): {
    width: number;
    height: number;
};
export declare function flushDimensionCache(): void;
export interface Coordinates {
    x?: number;
    y?: number;
}
