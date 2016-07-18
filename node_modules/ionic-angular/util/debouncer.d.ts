export declare class Debouncer {
    wait: number;
    private timer;
    callback: Function;
    constructor(wait: number);
    debounce(callback: Function): void;
    schedule(): void;
}
