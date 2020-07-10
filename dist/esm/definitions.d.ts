import { PluginListenerHandle } from "@capacitor/core";
declare module "@capacitor/core" {
    interface PluginRegistry {
        SendIntent: SendIntentPlugin;
    }
}
export interface SendIntentPlugin {
    /**
    * Listen for send action intent events (Android only). The extras will be passed as a key value pair
    * directly from the Android intent.
    */
    addListener(eventName: 'appSendActionIntent', listenerFunc: (data: AppSendActionIntentResult) => void): PluginListenerHandle;
}
export interface AppSendActionIntentResult {
    /**
     * An object with keys for Android intent names (like 'android.intent.extra.SUBJECT') and their value passed from the Android intent
     */
    extras: any;
}
