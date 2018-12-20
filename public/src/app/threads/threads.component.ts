import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-threads",
  templateUrl: "./threads.component.html",
  styleUrls: ["./threads.component.css"]
})
export class ThreadsComponent implements OnInit {
  threads: any;
  user: any;

  constructor(
    private httpService: HttpService,
    private chatService: ChatService
  ) {}

  public getThreads() {
    let threadsObservable = this.httpService.getThreads();
    threadsObservable.subscribe(data => {
      this.threads = data["data"];
    });
  }

  public getUser() {
    let userObservable = this.httpService.getLogin();
    userObservable.subscribe(user => {
      console.log("got the user", user);
      this.user = user[0];
    });
  }

  public subscribe(threadID) {
    let subscribeObservable = this.httpService.subscribeThread(
      this.user,
      threadID
    );
    subscribeObservable.subscribe(data => {
      console.log("Subscription successful", data);
    });
  }

  ngOnInit() {
    this.getThreads();
    this.getUser();

    this.chatService.getThreads().subscribe((thread: string) => {
      let threadsObservable = this.httpService.getThreads();
      threadsObservable.subscribe(data => {
        this.threads = data["data"];
      });
    });
  }
}
