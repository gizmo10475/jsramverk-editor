import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  message;

  constructor() { }

  setupSocketConnection() {
    this.socket = io('https://jsramverk-backend.azurewebsites.net/');

    // this.socket.emit('my message', 'Hello there from Angular.');
    this.socket.on('my broadcast', (data: string) => {
      this.message = data;
    });

  }


  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
