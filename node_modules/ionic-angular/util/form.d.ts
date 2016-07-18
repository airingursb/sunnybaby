/**
 * @private
 */
export declare class Form {
    private _blur;
    private _focused;
    private _ids;
    private _inputs;
    constructor();
    register(input: any): void;
    deregister(input: any): void;
    focusCtrl(document: any): void;
    focusOut(): void;
    setAsFocused(input: any): void;
    /**
     * Focuses the next input element, if it exists.
     */
    tabFocus(currentInput: any): any;
    nextId(): number;
}
