import * as io from "socket.io-client";
import { Observable } from "rxjs";

export class ChatService {
  private url = "http://localhost:3000";
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit("new-message", message);
  }

  public register(user) {
    this.socket.emit("register", user);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-message", message => {
        observer.next(message);
      });
    });
  };

  public getUsers = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-user", message => {
        observer.next(message);
      });
    });
  };
}
