import { Animation } from '../animations/animation';
import { Transition, TransitionOptions } from './transition';
import { ViewController } from '../components/nav/view-controller';
/**
 * @private
 */
export declare class PageTransition extends Transition {
    enteringPage: Animation;
    constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions);
    /**
     * DOM READ
     */
    readDimensions(): void;
    /**
     * DOM WRITE
     */
    writeDimensions(): void;
    destroy(): void;
}
