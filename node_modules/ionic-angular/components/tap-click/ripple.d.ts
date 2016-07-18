import { Activator } from './activator';
import { App } from '../app/app';
import { Coordinates } from '../../util/dom';
import { Config } from '../../config/config';
/**
 * @private
 */
export declare class RippleActivator extends Activator {
    constructor(app: App, config: Config);
    downAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: Coordinates): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: Coordinates): void;
    deactivate(): void;
}
