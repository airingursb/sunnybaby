/**
 * @name WebIntent
 * @description
 * @usage
 * For usage information please refer to the plugin's Github repo.
 */
export declare class WebIntent {
    static ACTION_VIEW: any;
    static EXTRA_TEXT: any;
    static startActivity(options: {
        action: any;
        url: string;
    }): Promise<any>;
    static hasExtra(extra: any): Promise<any>;
    static getExtra(extra: any): Promise<any>;
    static getUri(): Promise<string>;
    static onNewIntent(): Promise<string>;
    static sendBroadcast(options: {
        action: string;
        extras?: {
            option: boolean;
        };
    }): Promise<any>;
}
