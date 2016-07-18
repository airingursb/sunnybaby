import { TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @private
 */
export declare class VirtualHeader {
    templateRef: TemplateRef<Object>;
    constructor(templateRef: TemplateRef<Object>);
}
/**
 * @private
 */
export declare class VirtualFooter {
    templateRef: TemplateRef<Object>;
    constructor(templateRef: TemplateRef<Object>);
}
/**
 * @private
 */
export declare class VirtualItem {
    templateRef: TemplateRef<Object>;
    viewContainer: ViewContainerRef;
    constructor(templateRef: TemplateRef<Object>, viewContainer: ViewContainerRef);
}
