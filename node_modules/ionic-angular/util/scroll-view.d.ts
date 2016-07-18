export declare class ScrollView {
    private _el;
    private _js;
    private _top;
    private _pos;
    private _velocity;
    private _max;
    private _rafId;
    private _cb;
    isPlaying: boolean;
    constructor(ele: HTMLElement);
    getTop(): number;
    setTop(top: number): void;
    scrollTo(x: number, y: number, duration: number): Promise<any>;
    scrollToTop(duration: number): Promise<any>;
    scrollToBottom(duration: number): Promise<any>;
    stop(): void;
    /**
     * @private
     * JS Scrolling has been provided only as a temporary solution
     * until iOS apps can take advantage of scroll events at all times.
     * The goal is to eventually remove JS scrolling entirely. This
     * method may be removed in the future.
     */
    jsScroll(onScrollCallback: Function): Function;
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    private _start(ev);
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    private _move(ev);
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    private _setMax();
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    private _end(ev);
    /**
     * @private
     * Used for JS scrolling. May be removed in the future.
     */
    private _decelerate();
    /**
     * @private
     */
    destroy(): void;
}
