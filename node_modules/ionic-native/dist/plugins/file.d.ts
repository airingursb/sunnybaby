/**
 * @name File
 * @description
 * This plugin implements a File API allowing read/write access to files residing on the device.
 *
 *  This plugin is based on several specs, including : The HTML5 File API http://www.w3.org/TR/FileAPI/
 *  The (now-defunct) Directories and System extensions Latest: http://www.w3.org/TR/2012/WD-file-system-api-20120417/
 *  Although most of the plugin code was written when an earlier spec was current: http://www.w3.org/TR/2011/WD-file-system-api-20110419/
 *  It also implements the FileWriter spec : http://dev.w3.org/2009/dap/file-system/file-writer.html
 */
export declare class File {
    static cordovaFileError: {};
    /**
     * Check if a directory exists in a certain path, directory.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dir Name of directory to check
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static checkDir(path: string, dir: string): Promise<any>;
    /**
     * Creates a new directory in the specific path.
     * The replace boolean value determines whether to replace an existing directory with the same name.
     * If an existing directory exists and the replace value is false, the promise will fail and return an error.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory to create
     * @param {boolean} replace If true, replaces file with same name. If false returns error
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static createDir(path: string, dirName: string, replace: boolean): Promise<any>;
    /**
     * Remove a directory at a given path.
     *
     * @param {string} path The path to the directory
     * @param {string} dirName The directory name
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static removeDir(path: string, dirName: string): Promise<any>;
    /**
     * Move a directory to a given path.
     *
     * @param {string} path The source path to the directory
     * @param {string} dirName The source directory name
     * @param {string} newPath The destionation path to the directory
     * @param {string} newDirName The destination directory name
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static moveDir(path: string, dirName: string, newPath: string, newDirName: string): Promise<any>;
    /**
     * Copy a directory in various methods. If destination directory exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newDirName New name of directory to copy to (leave blank to remain the same)
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static copyDir(path: string, dirName: string, newPath: string, newDirName: string): Promise<any>;
    /**
     * List files and directory from a given path.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static listDir(path: string, dirName: string): Promise<any>;
    /**
     * Removes all files and the directory from a desired location.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static removeRecursively(path: string, dirName: string): Promise<any>;
    /**
     * Check if a file exists in a certain path, directory.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file to check
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static checkFile(path: string, file: string): Promise<any>;
    /**
     * Creates a new file in the specific path.
     * The replace boolean value determines whether to replace an existing file with the same name.
     * If an existing file exists and the replace value is false, the promise will fail and return an error.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to create
     * @param {boolean} replace If true, replaces file with same name. If false returns error
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static createFile(path: string, fileName: string, replace: boolean): Promise<any>;
    /**
     * Removes a file from a desired location.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to remove
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static removeFile(path: string, fileName: string): Promise<any>;
    /**
     * Read a file as string.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to move
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static readAsText(path: string, fileName: string): Promise<any>;
    /**
     * Move a file to a given path.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to move
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newFileName New name of file to move to (leave blank to remain the same)
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static moveFile(path: string, fileName: string, newPath: string, newFileName: string): Promise<any>;
    /**
     * Copy a file in various methods. If file exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newFileName New name of file to copy to (leave blank to remain the same)
     * @return Returns a Promise that resolves or rejects with an error.
     */
    static copyFile(path: string, fileName: string, newPath: string, newFileName: string): Promise<any>;
}
