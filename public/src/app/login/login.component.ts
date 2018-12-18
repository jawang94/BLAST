import { Component, OnInit } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { ModalService } from "../services/modal.service";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(
    private chatService: ChatService,
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  public onSubmit() {
    this.chatService.register(this.user);
    let newUserObservable = this.httpService.createUser(this.user);
    newUserObservable.subscribe(user => {
      console.log("New user registered!", user);
    });
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
