import { Component, OnInit, Input } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { HttpService } from "../services/http.service";
import * as io from "socket.io-client";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-threadroom",
  templateUrl: "./threadroom.component.html",
  styleUrls: ["./threadroom.component.css"]
})
export class ThreadroomComponent implements OnInit {
  user: any;
  message: any;
  messages: any[] = [];
  users: any[] = [];
  paramID: any;
  thread: any;

  constructor(
    private _route: ActivatedRoute,
    private chatService: ChatService,
    private httpService: HttpService
  ) {}

  public sendMessage() {
    this.message.user = this.user;
    this.message.id = this.paramID;
    this.chatService.sendMessage(this.message);
    this.message = { content: "", user: "", id: "" };
  }

  public joinRoom(id) {
    this.chatService.joinRoom(id);
    this.messages = [];
  }

  public getUser() {
    let userObservable = this.httpService.getLogin();
    userObservable.subscribe(user => {
      console.log("got the user", user);
      this.user = user[0];
    });
  }

  public getThread() {
    let threadObservable = this.httpService.findThread(this.paramID);
    threadObservable.subscribe(data => {
      console.log("thread data", data);
      this.thread = data["data"][0];
      console.log(this.thread);
    });
  }

  ngOnInit() {
    this.getUser();

    this._route.params.subscribe((params: Params) => {
      console.log("The param id is", params["id"]);
      this.paramID = params["id"];
      this.joinRoom(this.paramID);
      this.getThread();
    });

    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((user: any) => {
      console.log(user);
      this.users.push(user);
    });

    this.message = { content: "", user: "", id: "" };
  }
}
