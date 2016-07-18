import { Menu } from './menu';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
import { SlideData } from '../../gestures/slide-gesture';
/**
 * Gesture attached to the content which the menu is assigned to
 */
export declare class MenuContentGesture extends SlideEdgeGesture {
    menu: Menu;
    constructor(menu: Menu, contentEle: HTMLElement, options?: any);
    canStart(ev: any): boolean;
    onSlideBeforeStart(slide: SlideData, ev: any): void;
    onSlide(slide: SlideData, ev: any): void;
    onSlideEnd(slide: SlideData, ev: any): void;
    getElementStartPos(slide: SlideData, ev: any): number;
    getSlideBoundaries(): {
        min: number;
        max: number;
    };
}
/**
 * Gesture attached to the actual menu itself
 */
export declare class MenuTargetGesture extends MenuContentGesture {
    constructor(menu: Menu, menuEle: HTMLElement);
}
