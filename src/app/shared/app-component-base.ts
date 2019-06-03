
import { formatMessage } from 'devextreme/localization';

export abstract class AppComponentBase {

    translate(message: string) {
        return formatMessage(message, '');
    }
}

