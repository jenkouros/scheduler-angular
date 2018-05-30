import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';

export class SignalRService {
    private _hubConnection: HubConnection;
    containerUpdate$ = new Subject<number>();

    init() {
        return new Promise((resolve, reject) => {
            this._hubConnection = new HubConnectionBuilder()
            .withUrl(environment.signalRUrl, {
                transport: HttpTransportType.LongPolling
            })
            .configureLogging(LogLevel.Information)
            .build();

            this._hubConnection.start().catch(err => console.error(err));

            this._hubConnection.on('BroadcastContainerUpdate', (containerId) => {
                console.log('BroadcastContainerUpdate was called: ' + containerId);
                this.containerUpdate$.next(containerId);
            });

            resolve();
        });
    }

    containerSubscribe(containerIds: number[], subscribe = true) {
        this._hubConnection.invoke(subscribe ? 'Subscribe' : 'Unsubscribe', containerIds)
            .catch(err => console.log(err.toString()));
    }

    removeSubscriptions() {
        this._hubConnection.invoke('RemoveSubscriptions', false)
            .catch(err => console.log(err.toString()));
    }
}
