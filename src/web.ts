import { WebPlugin } from '@capacitor/core';
import { SendIntentPlugin } from './definitions';

export class SendIntentWeb extends WebPlugin implements SendIntentPlugin {
  constructor() {
    super({
      name: 'SendIntent',
      platforms: ['web']
    });
  }
}

const SendIntent = new SendIntentWeb();

export { SendIntent };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(SendIntent);
