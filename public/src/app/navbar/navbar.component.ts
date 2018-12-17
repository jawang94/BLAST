import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  }

}
