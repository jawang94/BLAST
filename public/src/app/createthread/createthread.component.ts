import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { ChatService } from "../services/chat.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-createthread",
  templateUrl: "./createthread.component.html",
  styleUrls: ["./createthread.component.css"]
})
export class CreatethreadComponent implements OnInit {
  newThread: any;
  user: any;

  constructor(
    private httpService: HttpService,
    private chatService: ChatService,
    private _router: Router
  ) {}

  public onSubmit() {
    console.log("Component check");
    this.newThread.creator = this.user;
    this.chatService.createThread(this.newThread);
    let newThreadObservable = this.httpService.createThread(this.newThread);
    newThreadObservable.subscribe(thread =>
      console.log("New thread created!", thread)
    );
    this.newThread = {
      title: "",
      category: "",
      content: "",
      imageURL: "",
      creator: ""
    };
    this._router.navigate(["/"]);
  }

  public getUser() {
    let userObservable = this.httpService.getLogin();
    userObservable.subscribe(user => {
      console.log("got the user", user);
      this.user = user[0];
    });
  }

  ngOnInit() {
    this.getUser();

    this.newThread = {
      title: "",
      category: "",
      content: "",
      imageURL: "",
      creator: ""
    };
  }
}
