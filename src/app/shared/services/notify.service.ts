import notify from 'devextreme/ui/notify';

export class NotifyService {
    notifyError(message) {
        this._notify(message, 'error');
    }

    notifySuccess(message) {
        this._notify(message, 'success');
    }

    notifyWarning(message) {
        this._notify(message, 'warning');
    }

    notifyInfo(message) {
        this._notify(message, 'info');
    }

    private _notify(message, type) {
        notify({ message, closeOnClick: true, closeOnOutsideClick: true }, type, 10000);
    }
}
