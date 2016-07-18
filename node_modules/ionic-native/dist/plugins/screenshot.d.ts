export declare class Screenshot {
    /**
     *  Takes screenshot and saves the image
     *
     * @param {string} format. Format can take the value of either 'jpg' or 'png'
     * On ios, only 'jpg' format is supported
     * @param {number} quality. Determines the quality of the screenshot.
     *        Default quality is set to 100.
     * @param {string} filename. Name of the file as stored on the storage
     */
    static save(format?: string, quality?: number, filename?: string): Promise<any>;
    /**
     *  Takes screenshot and returns the image as an URI
     *
     * @param {number} quality. Determines the quality of the screenshot.
     *        Default quality is set to 100.
     */
    static URI(quality?: number): Promise<any>;
}
