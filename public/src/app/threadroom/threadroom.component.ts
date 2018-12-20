import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, Input } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { HttpService } from "../services/http.service";
import * as io from "socket.io-client";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-threadroom",
  templateUrl: "./threadroom.component.html",
  styleUrls: ["./threadroom.component.css"]
})
export class ThreadroomComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  user: any;
  message: any;
  messages: any[] = [];
  users: any[] = [];
  paramID: any;

  constructor(
    private _route: ActivatedRoute,
    private chatService: ChatService,
    private httpService: HttpService
  ) {}

  public sendMessage() {
    this.message.user = this.user;
    this.message.id = this.paramID;
    this.chatService.sendMessage(this.message);
    this.message = { content: "", user: "", id: "" };
  }

  public joinRoom(id) {
    this.chatService.joinRoom(id);
  }

  public getUser() {
    let userObservable = this.httpService.getLogin();
    userObservable.subscribe(user => {
      console.log("got the user", user);
      this.user = user[0];
    });
  }
  
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnInit() {
    this.getUser();
    this.scrollToBottom();

    this._route.params.subscribe((params: Params) => {
      console.log("The param id is", params["id"]);
      this.paramID = params["id"];
      this.joinRoom(this.paramID);
    });

    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((user: any) => {
      console.log(user);
      this.users.push(user);
    });

    this.message = { content: "", user: "", id: "" };
  }
}
