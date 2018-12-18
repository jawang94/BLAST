import { Component, OnInit } from "@angular/core";
import { ChatService } from "./services/chat.service";
import * as $ from "jquery";
import * as io from "socket.io-client";
import { ModalService } from "./services/modal.service";
import { LoginComponent } from "./login/login.component";

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
    private modalService: ModalService
  ) {}

  public initLoginModal() {
    let inputs = {
      isMobile: false
    };
    this.modalService.init(LoginComponent, inputs, {});
  }

  public sendMessage() {
    this.message.user = this.user;
    this.chatService.sendMessage(this.message);
    this.message = { content: "", user: "" };
  }

  public onThreadSubmit() {
    this.thread.creator = this.user;
    this.chatService.createThread(this.thread);
  }

  ngOnInit() {
    this.initLoginModal();

    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getLogin().subscribe((user: any) => {
      console.log("You have logged in", user);
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

    this.user = { name: "", id: "" };
    this.message = { content: "", user: "" };
    this.thread = { title: "", category: "", creator: "" };

    $(document).ready(function() {
      var socket = io.connect("http://localhost:3000");

      socket.on("emit-new-login", function(user) {
        console.log(user, " has logged in.");
        $("#user_list").fadeIn(1000);
      });

      socket.on("emit-new-thread", function(data) {
        console.log("created new thread");
        $("#threadForm").fadeOut(1000);
        $("#threadList").fadeIn(1000);
      });
    });
  }
}
