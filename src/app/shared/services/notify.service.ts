import notify from 'devextreme/ui/notify';

export class NotifyService {
    notifyError(message) {
        this._notify(message, 'error', 8000);
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

    private _notify(message, type, displayTime = 3000) {
        notify({ message, closeOnClick: true, closeOnOutsideClick: true }, type, displayTime);
    }
}
