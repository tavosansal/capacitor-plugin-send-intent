import { WebPlugin } from '@capacitor/core';
export class SendIntentPluginWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map