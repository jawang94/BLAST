import { Component, OnInit } from "@angular/core";
import { ChatService } from "./services/chat.service";
import { HttpService } from "./services/http.service";
import * as $ from "jquery";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  message: any;
  messages: any[] = [];
  user: any;
  users: any[] = [];
  thread: any;
  threads: any[] = [];

  constructor(
    private chatService: ChatService,
    private httpService: HttpService
  ) {}

  public sendMessage() {
    this.message.user = this.user;
    this.chatService.sendMessage(this.message);
    this.message = { content: "", user: "" };
  }

  public onThreadSubmit() {
    this.thread.creator = this.user;
    this.chatService.createThread(this.thread);
  }

  public isLoggedIn() {
    let loginObservable = this.httpService.getLogin();
    loginObservable.subscribe(data => {
      console.log("is logged in data", data);
      this.user = data[0];
    });
  }

  ngOnInit() {
    this.isLoggedIn();

    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getLogin().subscribe((user: any) => {
      console.log("You have logged in", user);
      this.user = user;
    });
    this.chatService.getLogout().subscribe((user: any) => {
      console.log("You have logged out", user);
      this.user = user;
    });
    this.chatService.getUsers().subscribe((user: any) => {
      console.log(user);
      this.users.push(user);
    });
    this.chatService.getThreads().subscribe((thread: any) => {
      console.log(thread);
      this.threads.push(thread);
    });

    this.message = { content: "", user: "" };
    this.thread = { title: "", category: "", creator: "" };

    $(document).ready(function() {
      var socket = io.connect("http://localhost:3000");

      socket.on("emit-new-login", function(user) {});

      socket.on("emit-new-thread", function(data) {});
    });
  }
}
