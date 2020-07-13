<!-- <p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Example</h3>
<p align="center"><strong><code>@capacitor-community/send-intent</code></strong></p>
<p align="center">
  Capacitor community plugin for something awesome.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2020?style=flat-square" />
  <a href="https://github.com/capacitor-community/example/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/workflow/status/capacitor-community/example/CI?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/example"><img src="https://img.shields.io/npm/l/@capacitor-community/example?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/@capacitor-community/example"><img src="https://img.shields.io/npm/dw/@capacitor-community/example?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/example"><img src="https://img.shields.io/npm/v/@capacitor-community/example?style=flat-square" /></a> -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-0-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- </p>  -->

# Send Intent Plugin for Capacitor
This plugin allows you to expose a listener in your Javascript application for when another application sends data to your Capacitor application via the Android share menu or share sheet. This is useful if your Android application would like to receive data from other apps and your app can handle the shared data.

The `SendIntent` plugin exposes one event `appSendActionIntent` that receives a `data` object which contains the information received from the native intent verbatim. This is why you will see the keys for some of the objects are strange (i.e `android.intent.extra.TEXT`). However, this is intentional as it ensures compatibility with Android's contants for these values. 

## Maintainers

| Maintainer | GitHub | Social |
| -----------| -------| -------|
| Gustavo San Jose | [tavosansal](https://github.com/tavosansal) | [@tavosansal](https://twitter.com/tavosansal) |

## Installation

```bash
npm i capacitor-plugin-send-intent
```

## Configuration

### Register Plugin on Capacitor Android App

First you must register this plugin as part of your Android capacitor app. This is done in the `MainActivity.java file`. It should be located at `your-project-name/android/app/src/main/java/com/yourdomain/yourproject/MainActivity.java`

```java
import com.gustavosanjose.sendintentplugin.SendIntent;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(SendIntent.class);
    }});
  }
}
```

### Register Intent Filters
Next, you must add what type of intents your application can receive from other apps. This is done in the `AndroidManifest.xml` file located at `your-project-name/android/app/src/main/AndroidManifest.xml`. Under the `<activity>` node you can add intent filters for your application. Here is an example for an intent filter that receives plain text from other apps.

```xml
<intent-filter>
  <action android:name="android.intent.action.SEND" />
  <category android:name="android.intent.category.DEFAULT" />
  <data android:mimeType="text/plain" />
</intent-filter>
```

It is possible to receive other different date types like images and video. You may add your intent filters here as well.

You can find more information about intent filters [here](https://developer.android.com/guide/components/intents-filters)

## Usage

Once setup is complete, you can add an event listener for when a different application sends data to your application with the specified Intent Filter. 
This usually happens from the Android share sheet. You can hook into that intent filter and handle the information in your Capacitor application. Here is an example event listener in Javascript code:

```javascript
// This is a contribed example. You probably want to add this listener where you have other Capacitor listeners in your corresponding app code for your framework of choice.

import { Plugins } from "@capacitor/core";

const { SendIntent } = Plugins;

SendIntent.addListener('appSendActionIntent', (data) => {
  const { extras } = data;
  const textKey = 'android.intent.extra.TEXT';
  
  alert(`This ${extras[textKey]} was shared from another app!`);
});
```

Since the native event will relay the `extras` as they come to your Javascript project you don't necesarily need a different event for each intent filter your application will handle. You can handle different types from within the same event listener:

```javascript
SendIntent.addListener('appSendActionIntent', (data) => {
  const { extras } = data;
  const textKey = 'android.intent.extra.TEXT';
  // Usually for image and video intent
  const streamKey = 'android.intent.extra.STREAM';
  
  if (extras[textKey]) {
    // Do something with the text
  } else if (extras[streamKey]) {
    // Do something with the stream
  }
});
```

## Tips
### Be Aware of Framework Lifecycle
If you register an event and you share information from another app to your Capacitor app bear in mind that your app might not be booted at that time. Therefore you might not have your framework's code at your disposal. So depending on what you are doing you might have to save that information from `extras` and consume it once your Capacitor app is fully booted up. This usually happens on a cold boot of the app.


### What about iOS?
iOS is technically possible but it is a much more involved process that requires  you to create a Share Target for your application. This is something I may do in the future but I cannot guaranteed that functionality.

### What about the browser's Share API?
The share API works for sharing data from your app to another app. It is fully supported on Chrome for Android.
However, if you want the inverse and receive data from other apps you need to use this plugin.