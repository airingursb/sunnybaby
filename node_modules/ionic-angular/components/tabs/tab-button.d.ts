import { ElementRef, EventEmitter } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Tab } from './tab';
/**
 * @private
 */
export declare class TabButton extends Ion {
    private disHover;
    private hasTitle;
    private hasIcon;
    private hasTitleOnly;
    private hasIconOnly;
    private hasBadge;
    private layout;
    tab: Tab;
    ionSelect: EventEmitter<Tab>;
    constructor(config: Config, elementRef: ElementRef);
    ngOnInit(): void;
    private onClick(ev);
}
