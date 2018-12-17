import { Component } from "@angular/core";
import { ChatService } from "./services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  message: string;
  messages: string[] = [];
  user: any;
  users: any[] = [];

  constructor(private chatService: ChatService) {}

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = "";
  }

  public onSubmit() {
    this.chatService.register(this.user);
    this.user = "";
  }

  ngOnInit() {
    this.user = { name: "", id: "" };

    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((user: any) => {
      console.log(user);
      this.users.push(user);
    });
  }
}
