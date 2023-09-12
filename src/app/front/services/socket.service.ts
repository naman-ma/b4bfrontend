import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket: any;

  public status: boolean = false;

  constructor() {
    this.setupSocketConnection();
    this._connect();
  }

  setupSocketConnection() {
    this._socket = io(environment.SOCKET_ENDPOINT);
  }

  bind(action, callback) {

    if (!this.status) {
      console.log('bind action:--21-- ', action);
      return;
    }

    this._socket.on(action, callback);
  }

  emit(action, data) {
    if (!this.status) {
      console.log('emit action:--35-- ', action);
      return;
    }
    this._socket.emit(action, data);
  }

  private _connect() {
    this._socket.on('connect', this._connectHandler.bind(this))
  }

  private _connectHandler(data) {

    this.status = true;

    this._socket.emit('incoming_message', 'Hello there from Angular!');

    // this._socket.on('custom', console.log)
    this._socket.on('custom', (data: string) => {
      console.log('53--custom--data: ', data);
    });

    this._disconnect();
  }

  private _disconnect() {
    this.bind('disconnect', this._disconnectHandler.bind(this))
  }

  private _disconnectHandler(data) {

    this.status = false;

    this.emit('incoming_message', 'Hello there from Angular, disconnected!');
    console.log('Ho gya disconnect');
  }

}
