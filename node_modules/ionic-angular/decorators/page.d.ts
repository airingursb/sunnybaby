import { ChangeDetectionStrategy, ViewEncapsulation, Type } from '@angular/core';
export interface PageMetadata {
    selector?: string;
    inputs?: string[];
    outputs?: string[];
    properties?: string[];
    events?: string[];
    host?: {
        [key: string]: string;
    };
    providers?: any[];
    directives?: Array<Type | any[]>;
    pipes?: Array<Type | any[]>;
    exportAs?: string;
    queries?: {
        [key: string]: any;
    };
    template?: string;
    templateUrl?: string;
    moduleId?: string;
    styleUrls?: string[];
    styles?: string[];
    changeDetection?: ChangeDetectionStrategy;
    encapsulation?: ViewEncapsulation;
}
/**
 * @private
 */
export declare function Page(config: PageMetadata): (cls: any) => any;
