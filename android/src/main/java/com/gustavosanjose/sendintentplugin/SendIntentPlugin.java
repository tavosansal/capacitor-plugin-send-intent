package com.gustavosanjose.sendintentplugin;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class SendIntentPlugin extends Plugin {

    private static final String EVENT_SEND_ACTION_INTENT = "appSendActionIntent";

    /**
     * Handle ACTION_VIEW intents to store a URL that was used to open the app
     * @param intent
     */
    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);

        // read intent action
        String action = intent.getAction();

        if (Intent.ACTION_SEND.equals(action)) {
            // Get the extras from the intent
            Bundle bundle = intent.getExtras();

            JSObject extras = new JSObject();
            for (String key : bundle.keySet()) {
                Object value = bundle.get(key);
                extras.put(key, value);
            }

            JSObject ret = new JSObject();
            ret.put("extras", extras);

            notifyListeners(EVENT_SEND_ACTION_INTENT, ret, true);
        }
    }
}
