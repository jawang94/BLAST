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
  userLogin: any;

  constructor(
    private chatService: ChatService,
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  public onSubmit() {
    let userLoginObservable = this.httpService.loginUser(this.userLogin);
    userLoginObservable.subscribe(data => {
      console.log(data, " has logged in.");
      this.chatService.login(data["data"]);
    });
    this.close();
  }

  public onReset() {
    this.close();
  }

  public close() {
    this.modalService.destroy();
  }

  ngOnInit() {
    this.userLogin = { name: "", password: "" };
  }
}
