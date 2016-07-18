import { App } from '../app/app';
import { Config } from '../../config/config';
import { Coordinates } from '../../util/dom';
export declare class Activator {
    protected app: App;
    protected _css: string;
    protected _queue: HTMLElement[];
    protected _active: HTMLElement[];
    constructor(app: App, config: Config);
    downAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: Coordinates): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: Coordinates): void;
    clearState(): void;
    deactivate(): void;
    disableActivated(ev: any): boolean;
}
