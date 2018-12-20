import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { ModalService } from "../services/modal.service";
import { ChatService } from "../services/chat.service";
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  @Input() user: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private modalService: ModalService,
    private chatService: ChatService
  ) {}

  public initSignupModal() {
    let inputs = {
      isMobile: false
    };
    this.modalService.init(SignupComponent, inputs, {});
  }

  public initLoginModal() {
    let inputs = {
      isMobile: false
    };
    this.modalService.init(LoginComponent, inputs, {});
  }

  public logoutUser() {
    let logoutObservable = this._httpService.logoutUser();
    logoutObservable.subscribe(data => {
      console.log(data, "You have logged out");
      this.chatService.logout(data);
      this._router.navigate(["/"]);
    });
  }

  ngOnInit() {}
}
