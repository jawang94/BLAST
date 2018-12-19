import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-createthread",
  templateUrl: "./createthread.component.html",
  styleUrls: ["./createthread.component.css"]
})
export class CreatethreadComponent implements OnInit {
  newThread: any;

  constructor(private httpService: HttpService) {}

  public onSubmit() {
    console.log("Component check");
    let newThreadObservable = this.httpService.createThread(this.newThread);
    newThreadObservable.subscribe(thread =>
      console.log("New thread created!", thread)
    );
    this.newThread = { title: "", category: "", imageURL: "" };
  }

  ngOnInit() {
    this.newThread = { title: "", category: "", imageURL: "" };
  }
}
