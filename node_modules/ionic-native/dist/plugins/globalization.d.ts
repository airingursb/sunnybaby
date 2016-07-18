/**
 * @name Globalization
 * @description
 * @usage
 * ```js
 * import {Globalization} from 'ionic-native';
 *
 *
 *
 * ```
 */
export declare class Globalization {
    /**
     * Returns the BCP-47 compliant language identifier tag to the successCallback with a properties object as a parameter. That object should have a value property with a String value.
     * @return {Promise<{value: string}>}
     */
    static getPreferredLanguage(): Promise<{
        value: string;
    }>;
    /**
     * Returns the BCP 47 compliant locale identifier string to the successCallback with a properties object as a parameter.
     * @return {Promise<{value: string}>}
     */
    static getLocaleName(): Promise<{
        value: string;
    }>;
    /**
     * Converts date to string
     * @param date
     * @param options
     * @return {Promise<{value: string}>}
     */
    static dateToString(date: Date, options: {
        formatLength: string;
        selector: string;
    }): Promise<{
        value: string;
    }>;
    /**
     *
     * @param dateString
     * @param options
     */
    static stringToDate(dateString: string, options: {
        formatLength: string;
        selector: string;
    }): Promise<{
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    }>;
    /**
     *
     * @param options
     */
    static getDatePattern(options: {
        formatLength: string;
        selector: string;
    }): Promise<{
        pattern: string;
    }>;
    /**
     *
     * @param options
     */
    static getDateNames(options: {
        type: string;
        item: string;
    }): Promise<{
        value: Array<string>;
    }>;
    /**
     * Check if day light saving is active
     * @param date
     */
    static isDayLightSavingsTime(date: Date): Promise<{
        dst: string;
    }>;
    /**
     * Get first day of week
     */
    static getFirstDayOfWeek(): Promise<{
        value: string;
    }>;
    /**
     *
     * @param options
     */
    static numberToString(options: {
        type: string;
    }): Promise<{
        value: string;
    }>;
    /**
     *
     * @param stringToConvert
     * @param options
     */
    static stringToNumber(stringToConvert: string, options: {
        type: string;
    }): Promise<{
        value: number | string;
    }>;
    /**
     *
     * @param options
     */
    static getNumberPattern(options: {
        type: string;
    }): Promise<{
        pattern: string;
        symbol: string;
        fraction: number;
        rounding: number;
        positive: string;
        negative: string;
        decimal: string;
        grouping: string;
    }>;
    /**
     *
     * @param currencyCode
     */
    static getCurrencyPattern(currencyCode: string): Promise<{
        pattern: string;
        code: string;
        fraction: number;
        rounding: number;
        decimal: number;
        grouping: string;
    }>;
}
