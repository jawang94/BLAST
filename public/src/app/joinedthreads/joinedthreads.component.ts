import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../services/http.service";
import { ChatService } from "../services/chat.service";
@Component({
  selector: "app-joinedthreads",
  templateUrl: "./joinedthreads.component.html",
  styleUrls: ["./joinedthreads.component.css"]
})
export class JoinedthreadsComponent implements OnInit {
  @Input() user: any;
  allThreads: any[] = [];
  userThreads: any[] = [];

  constructor(
    private httpService: HttpService,
    private chatService: ChatService
  ) {}

  public getAllThreads() {
    let allThreadsObservable = this.httpService.getThreads();
    allThreadsObservable.subscribe(data => {
      data["data"].forEach(thread => {
        this.allThreads.push(thread);
        console.log(this.allThreads);
        this.sortThreads();
      });
    });
  }

  public sortThreads() {
    console.log("sorting with this userID", this.user._id);
    this.allThreads.forEach(thread => {
      thread.users.forEach(item => {
        if (item._id == this.user._id) {
          if (!this.userThreads.includes(thread)) {
            this.userThreads.push(thread);
          }
        }
      });
    });
    console.log("finished product", this.userThreads);
  }

  public getUser() {
    let userObservable = this.httpService.getLogin();
    userObservable.subscribe(user => {
      console.log("got the user", user);
      this.user = user[0];
      this.getAllThreads();
    });
  }

  ngOnInit() {
    this.getUser();

    this.chatService.getLogin().subscribe((user: any) => {
      this.getAllThreads();
    });
  }
}
