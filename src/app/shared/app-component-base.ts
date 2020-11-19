
import { formatMessage } from 'devextreme/localization';

export abstract class AppComponentBase {

    translate(message: string) {
        const mess = formatMessage(message, '');
        if (mess === '') {
            return '#' + message + '#';
        }
        return mess;
    }
}

export function translate(message: string) {
  const mess = formatMessage(message, '');
  if (mess === '') {
      return '#' + message + '#';
  }
  return mess;
}
