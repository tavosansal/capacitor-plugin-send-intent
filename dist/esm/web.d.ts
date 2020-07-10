import { WebPlugin } from '@capacitor/core';
import { SendIntentPlugin } from './definitions';
export declare class SendIntentPluginWeb extends WebPlugin implements SendIntentPlugin {
    constructor();
}
declare const SendIntent: SendIntentPluginWeb;
export { SendIntent };
