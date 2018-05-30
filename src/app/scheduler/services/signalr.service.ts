import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';

export class SignalRService {
    private _hubConnection: HubConnection;
    containerUpdate$ = new Subject<number>();
    connectionStarted$ = new Subject<boolean>();

    init() {
        return new Promise((resolve, reject) => {
            this._hubConnection = new HubConnectionBuilder()
            .withUrl(environment.signalRUrl, {
                transport: HttpTransportType.LongPolling
            })
            .configureLogging(LogLevel.Information)
            .build();

            this._hubConnection.onclose(() => {
                console.log('Reconnecting');
                setTimeout(() =>
                    this.hubConnect()
                    // this._hubConnection.start()
                , 2000);
            });

            this._hubConnection.on('BroadcastContainerUpdate', (containerId) => {
                console.log('BroadcastContainerUpdate was called: ' + containerId);
                this.containerUpdate$.next(containerId);
            });

            this.hubConnect();

            resolve();
        });
    }

    private hubConnect() {
        this._hubConnection.start()
        .then(_ => {
            this.connectionStarted$.next(true);
        })
        .catch(err => {
            console.log('error');
            setTimeout(() =>
                this.hubConnect()
                // this._hubConnection.start()
            , 2000);
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
