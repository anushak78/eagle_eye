import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private socket: Socket) { }

  connect() {
    this.socket.ioSocket.io.uri = "http://localhost:3000" //new uri
    this.socket.connect(); //manually connection
  }

  sendMessage(message) {
    this.socket.emit('chat message', message);
  }

  getMessages = () => {
    this.initConnect()
    return Observable.create((observer) => {
      this.socket.on('chat message', (message) => {
        observer.next(message);
      })
    });
  }

  initConnect() {
    return Observable.create((observer) => {
      this.socket.on('connection', (socket) => {
        observer.next(socket);
      })
    });
  }

  addUser(id) {
    this.socket.emit('new user', id);
  }

}
