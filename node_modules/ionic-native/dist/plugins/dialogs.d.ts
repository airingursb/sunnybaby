export interface PromptCallback {
    /**
     * The index of the pressed button. (Number) Note that the index uses one-based indexing, so the value is 1, 2, 3, etc.
     */
    buttonIndex: number;
    /**
     * The text entered in the prompt dialog box. (String)
     */
    input1: string;
}
/**
 * @name Dialogs
 * @description
 * This plugin gives you ability to access and customize the device native dialogs.
 *
 * Requires Cordova plugin: `cordova-plugin-dialogs`. For more info, please see the [Dialogs plugin docs](https://github.com/apache/cordova-plugin-dialogs).
 *
 * @usage
 * ```js
 * import {Dialogs} from 'ionic-native';
 *
 *
 *
 *
 * ```
 */
export declare class Dialogs {
    /**
     * Shows a custom alert or dialog box.
     * @param message Dialog message. (String)
     * @param title Dialog title. (String) (Optional, defaults to Alert)
     * @param buttonName Button name. (String) (Optional, defaults to OK)
     * @returns {Promise<any>} Returns a blank promise once the user has dismissed the alert.
     */
    static alert(message: any, title?: string, buttonName?: string): Promise<any>;
    /**
     * Displays a customizable confirmation dialog box.
     * @param message Dialog message. (String)
     * @param title Dialog title. (String) (Optional, defaults to Confirm)
     * @param buttonLabels Array of strings specifying button labels. (Array) (Optional, defaults to [OK,Cancel])
     * @returns {Promise<number>} Returns a promise that resolves the button index that was clicked. Note that the index use one-based indexing.
     */
    static confirm(message: any, title?: string, buttonLabels?: Array<string>): Promise<number>;
    /**
     * Displays a native dialog box that is more customizable than the browser's prompt function.
     * @param message Dialog message. (String)
     * @param title Dialog title (String) (Optional, defaults to Prompt)
     * @param buttonLabels  Array of strings specifying button labels (Array) (Optional, defaults to ["OK","Cancel"])
     * @param defaultText Default textbox input value (String) (Optional, Default: empty string)
     * @returns {Promise<any>} Returns a promise that resolves an object with the button index clicked and the text entered
     */
    static prompt(message?: string, title?: string, buttonLabels?: Array<string>, defaultText?: string): Promise<any>;
    /**
     * The device plays a beep sound.
     * @param times The number of times to repeat the beep. (Number)
     */
    static beep(times: number): void;
}
