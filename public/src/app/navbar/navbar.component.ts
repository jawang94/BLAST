import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { ModalService } from "../services/modal.service";
import { LoginComponent } from "../login/login.component";
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
    private modalService: ModalService
  ) {}

  public initLoginModal() {
    let inputs = {
      isMobile: false
    };
    this.modalService.init(LoginComponent, inputs, {});
  }

  ngOnInit() {}
}
