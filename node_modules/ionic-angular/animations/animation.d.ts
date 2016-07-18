/**
 * @private
 *
 * - play
 * - Add before classes - DOM WRITE
 * - Remove before classes - DOM WRITE
 * - Add before inline styles - DOM WRITE
 * - set inline FROM styles - DOM WRITE
 * - RAF
 * - run before functions that have dom reads - DOM READ
 * - run before functions that have dom writes - DOM WRITE
 * - set css transition duration/easing - DOM WRITE
 * - RAF
 * - set inline TO styles - DOM WRITE
 */
export declare class Animation {
    private _parent;
    private _c;
    private _el;
    private _opts;
    private _fx;
    private _dur;
    private _easing;
    private _bfSty;
    private _bfAdd;
    private _bfRmv;
    private _afSty;
    private _afAdd;
    private _afRmv;
    private _bfReadFns;
    private _bfWriteFns;
    private _fFns;
    private _fOnceFns;
    private _rv;
    private _unregTrans;
    private _tmr;
    private _lastUpd;
    isPlaying: boolean;
    hasTween: boolean;
    hasCompleted: boolean;
    constructor(ele?: any, opts?: AnimationOptions);
    /**
     * NO DOM
     */
    _reset(): void;
    element(ele: any): Animation;
    /**
     * NO DOM
     */
    private _addEle(ele);
    /**
     * NO DOM
     */
    parent(parentAnimation: Animation): Animation;
    /**
     * NO DOM
     */
    add(childAnimation: Animation): Animation;
    /**
     * NO DOM
     */
    getDuration(): number;
    /**
     * NO DOM
     */
    duration(milliseconds: number): Animation;
    /**
     * NO DOM
     */
    getEasing(): string;
    /**
     * NO DOM
     */
    easing(name: string): Animation;
    /**
     * NO DOM
     */
    from(prop: string, val: any): Animation;
    /**
     * NO DOM
     */
    to(prop: string, val: any, clearProperyAfterTransition?: boolean): Animation;
    /**
     * NO DOM
     */
    fromTo(prop: string, fromVal: any, toVal: any, clearProperyAfterTransition?: boolean): Animation;
    /**
     * NO DOM
     */
    private _addProp(state, prop, val);
    /**
     * NO DOM
     */
    before: {
        addClass: (className: string) => Animation;
        removeClass: (className: string) => Animation;
        setStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        clearStyles: (propertyNames: string[]) => Animation;
        addDomReadFn: (domReadFn: Function) => Animation;
        addDomWriteFn: (domWriteFn: Function) => Animation;
    };
    /**
     * NO DOM
     */
    after: {
        addClass: (className: string) => Animation;
        removeClass: (className: string) => Animation;
        setStyles: (styles: {
            [property: string]: any;
        }) => Animation;
        clearStyles: (propertyNames: string[]) => Animation;
    };
    /**
     * DOM WRITE
     */
    play(opts?: PlayOptions): void;
    /**
     * DOM WRITE
     */
    stop(opts?: PlayOptions): void;
    /**
     * DOM WRITE
     */
    _asyncEnd(duration: number, shouldComplete: boolean): void;
    /**
     * NO DOM
     */
    _clearAsync(): void;
    /**
     * DOM WRITE
     */
    _progress(stepValue: number): void;
    /**
     * DOM WRITE
     */
    _setTrans(duration: number, forcedLinearEasing: boolean): void;
    /**
     * DOM WRITE
     */
    _willChg(addWillChange: boolean): void;
    /**
     * DOM WRITE
     */
    _before(): void;
    /**
     * DOM READ
     */
    _beforeReadFn(): void;
    /**
     * DOM WRITE
     */
    _beforeWriteFn(): void;
    /**
     * DOM WRITE
     */
    _after(): void;
    /**
     * DOM WRITE
     */
    progressStart(): void;
    /**
     * DOM WRITE
     */
    progressStep(stepValue: number): void;
    /**
     * DOM WRITE
     */
    progressEnd(shouldComplete: boolean, currentStepValue: number): void;
    /**
     * POSSIBLE DOM READ/WRITE
     */
    onFinish(callback: Function, onceTimeCallback?: boolean, clearOnFinishCallacks?: boolean): Animation;
    /**
     * POSSIBLE DOM READ/WRITE
     */
    _didFinish(hasCompleted: boolean): void;
    /**
     * NO DOM
     */
    reverse(shouldReverse?: boolean): Animation;
    /**
     * DOM WRITE
     */
    destroy(removeElement?: boolean): void;
    /**
     * NO DOM
     */
    _transEl(): HTMLElement;
    static create(name: string, opts?: AnimationOptions): Animation;
    static register(name: string, AnimationClass: any): void;
}
export interface AnimationOptions {
    animation?: string;
    renderDelay?: number;
}
export interface PlayOptions {
    duration?: number;
    stepValue?: number;
}
