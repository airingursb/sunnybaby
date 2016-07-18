export interface PluginOptions {
    configuration?: any;
    rulesDirectory?: string;
    tslint?: any;
}
export interface ReportOptions {
    emitError?: boolean;
    reportLimit?: number;
    summarizeFailureOutput?: boolean;
}
export interface TslintFile {
    tslint: any;
    path: string;
    relative: string;
    contents: Buffer | any;
    isStream(): boolean;
    isNull(): boolean;
}
export interface Position {
    position: number;
    line: number;
    character: number;
}
export interface Failure {
    name: string;
    failure: string;
    startPosition: Position;
    endPosition: Position;
    ruleName: string;
}
export interface Reporter {
    (failures: Failure[], file?: TslintFile, options?: ReportOptions): void;
}
export interface TslintPlugin {
    (pluginOptions?: PluginOptions): any;
    proseErrorFormat: (failure: Failure) => string;
    report: (reporter: string | Reporter, options?: ReportOptions) => any;
}
declare const tslintPlugin: TslintPlugin;
export default tslintPlugin;
