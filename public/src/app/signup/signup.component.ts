import { Component, OnInit } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { ModalService } from "../services/modal.service";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  newUser: any;

  constructor(
    private chatService: ChatService,
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  public onSubmit() {
    this.chatService.register(this.newUser);
    let newUserObservable = this.httpService.createUser(this.newUser);
    newUserObservable.subscribe(data => {
      console.log("New user registered!", data["item"]);
    });
    this.newUser = { name: "", password: "" };
    this.close();
  }

  public onReset() {
    this.close();
  }

  public close() {
    this.modalService.destroy();
  }

  ngOnInit() {
    this.newUser = { name: "", password: "" };
  }
}
