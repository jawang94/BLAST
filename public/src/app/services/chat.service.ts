import * as io from "socket.io-client";
import { Observable } from "rxjs";

export class ChatService {
  private url = "http://localhost:3000";
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public joinRoom(id) {
    this.socket.emit("join-room", id);
  }

  public leaveRoom() {
    this.socket.emit("leave-room");
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

  public login = user => {
    this.socket.emit("new-login", user);
  };

  public logout = user => {
    this.socket.emit("new-logout", user);
  };

  public subscribe = () => {
    this.socket.emit("new-subscription");
  };

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

  public getLogout = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-logout", user => {
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

  public getSubscription = () => {
    return Observable.create(observer => {
      this.socket.on("emit-new-thread", () => {
        observer.next("sub");
      });
    });
  };
}
