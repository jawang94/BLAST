import { Component, OnInit, Input } from "@angular/core";
import { ChatService } from "../services/chat.service";
import * as io from "socket.io-client";

@Component({
  selector: "app-threadroom",
  templateUrl: "./threadroom.component.html",
  styleUrls: ["./threadroom.component.css"]
})
export class ThreadroomComponent implements OnInit {
  @Input() user: any;
  message: any;
  messages: any[] = [];
  users: any[] = [];

  constructor(private chatService: ChatService) {}

  public sendMessage() {
    this.message.user = this.user;
    this.chatService.sendMessage(this.message);
    this.message = { content: "", user: "" };
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((user: any) => {
      console.log(user);
      this.users.push(user);
    });

    this.user = { name: "", id: "" };
    this.message = { content: "", user: "" };
  }
}
