import { WebPlugin } from '@capacitor/core';
import { SendIntentPlugin } from './definitions';

export class SendIntentPluginWeb extends WebPlugin implements SendIntentPlugin {
  constructor() {
    super({
      name: 'SendIntentPlugin',
      platforms: ['web']
    });
  }
}

const SendIntent = new SendIntentPluginWeb();

export { SendIntent };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(SendIntent);
