/**
 * Storage is an easy way to store key/value pairs and other complicated
 * data in a way that uses a variety of storage engines underneath.
 *
 * For most cases, we recommend the SqlStorage system as it will store
 * data in a file in the app's sandbox. LocalStorage should ONLY be used
 * for temporary data as it may be 'cleaned up' by the operation system
 * during low disk space situations.
 */
/**
 * @private
*/
export declare class Storage {
    private _strategy;
    constructor(strategyCls: IStorageEngine, options?: any);
    get(key: string): Promise<any>;
    getJson(key: string): Promise<any>;
    setJson(key: string, value: any): Promise<any>;
    set(key: string, value: any): Promise<any>;
    remove(key: string): Promise<any>;
    query(query: string, params?: any): Promise<any>;
    clear(): Promise<any>;
}
export interface IStorageEngine {
    new (options: any): StorageEngine;
}
/**
 * @private
*/
export declare class StorageEngine {
    constructor(options?: {});
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<any>;
    remove(key: string): Promise<any>;
    query(query: string, params?: any): Promise<any>;
    clear(): Promise<any>;
}
