import { ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
/**
 * NO DOM
 */
export declare function processRecords(stopAtHeight: number, records: any[], cells: VirtualCell[], headerFn: Function, footerFn: Function, data: VirtualData): void;
/**
 * NO DOM
 */
export declare function populateNodeData(startCellIndex: number, endCellIndex: number, viewportWidth: number, scrollingDown: boolean, cells: VirtualCell[], records: any[], nodes: VirtualNode[], viewContainer: ViewContainerRef, itmTmp: TemplateRef<Object>, hdrTmp: TemplateRef<Object>, ftrTmp: TemplateRef<Object>, initialLoad: boolean): boolean;
/**
 * DOM READ THEN DOM WRITE
 */
export declare function initReadNodes(nodes: VirtualNode[], cells: VirtualCell[], data: VirtualData): void;
/**
 * DOM READ
 */
export declare function updateDimensions(nodes: VirtualNode[], cells: VirtualCell[], data: VirtualData, initialUpdate: boolean): void;
/**
 * DOM WRITE
 */
export declare function writeToNodes(nodes: VirtualNode[], cells: VirtualCell[], totalRecords: number): void;
/**
 * NO DOM
 */
export declare function adjustRendered(cells: VirtualCell[], data: VirtualData): void;
/**
 * NO DOM
 */
export declare function getVirtualHeight(totalRecords: number, lastCell: VirtualCell): number;
/**
 * NO DOM
 */
export declare function estimateHeight(totalRecords: number, lastCell: VirtualCell, existingHeight: number, difference: number): number;
/**
 * DOM READ
 */
export declare function calcDimensions(data: VirtualData, viewportElement: HTMLElement, approxItemWidth: string, approxItemHeight: string, appoxHeaderWidth: string, approxHeaderHeight: string, approxFooterWidth: string, approxFooterHeight: string, bufferRatio: number): void;
export interface VirtualCell {
    record?: number;
    tmpl?: number;
    data?: any;
    row?: number;
    left?: number;
    width?: number;
    top?: number;
    height?: number;
    reads?: number;
    isLast?: boolean;
}
export interface VirtualNode {
    cell?: number;
    tmpl: number;
    view: EmbeddedViewRef<VirtualContext>;
    isLastRecord?: boolean;
    hidden?: boolean;
    hasChanges?: boolean;
    lastTransform?: string;
}
export declare class VirtualContext {
    $implicit: any;
    index: number;
    count: number;
    constructor($implicit: any, index: number, count: number);
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
}
export interface VirtualData {
    scrollTop?: number;
    scrollDiff?: number;
    viewWidth?: number;
    viewHeight?: number;
    renderHeight?: number;
    topCell?: number;
    bottomCell?: number;
    topViewCell?: number;
    bottomViewCell?: number;
    valid?: boolean;
    itmWidth?: number;
    itmHeight?: number;
    hdrWidth?: number;
    hdrHeight?: number;
    ftrWidth?: number;
    ftrHeight?: number;
}
