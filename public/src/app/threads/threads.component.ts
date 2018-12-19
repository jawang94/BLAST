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

  ngOnInit() {
    this.getThreads();

    this.chatService.getThreads().subscribe((thread: string) => {
      let threadsObservable = this.httpService.getThreads();
      threadsObservable.subscribe(data => {
        this.threads = data["data"];
      });
    });
  }
}
