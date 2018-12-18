import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

export class ChatService {
  private url = "http://localhost:3000";
  private socket;

  constructor(private httpService: HttpService) {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit("new-message", message);
  }

  public register(user) {
    this.socket.emit("new-user", user);
  }

  public createThread(thread) {
    this.socket.emit("new-thread", thread);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-message", message => {
        observer.next(message);
      });
    });
  };

  public getLogin = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-login", user => {
        observer.next(user);
      });
    });
  };

  public getUsers = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-user", user => {
        observer.next(user);
      });
    });
  };

  public getThreads = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-thread", thread => {
        observer.next(thread);
      });
    });
  };
}
