import { Component, OnInit } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { ModalService } from "../services/modal.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(
    private chatService: ChatService,
    private modalService: ModalService
  ) {}

  public onSubmit() {
    this.chatService.register(this.user);
    this.user = { name: "", id: "" };
    this.close();
  }

  public close() {
    this.modalService.destroy();
  }

  ngOnInit() {
    this.user = { name: "", id: "" };
  }
}
