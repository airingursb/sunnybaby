export declare class FeatureDetect {
    private _results;
    run(window: Window, document: Document): void;
    has(featureName: string): boolean;
    static add(name: string, fn: any): void;
}
