import { Animation } from '../animations/animation';
import { ViewController } from '../components/nav/view-controller';
/**
 * @private
 *
 * - play
 * - Add before classes - DOM WRITE
 * - Remove before classes - DOM WRITE
 * - Add before inline styles - DOM WRITE
 * - set inline FROM styles - DOM WRITE
 * - RAF
 * - read toolbar dimensions - DOM READ
 * - write content top/bottom padding - DOM WRITE
 * - set css transition duration/easing - DOM WRITE
 * - RAF
 * - set inline TO styles - DOM WRITE
 */
export declare class Transition extends Animation {
    enteringView: ViewController;
    constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions);
    static createTransition(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions): Transition;
    static register(name: string, TransitionClass: any): void;
}
export interface TransitionOptions {
    animation: string;
    duration: number;
    easing: string;
    direction: string;
    renderDelay?: number;
    isRTL?: boolean;
    ev?: any;
}
