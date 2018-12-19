import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private loggedIn: boolean;
  constructor(private _http: HttpClient) {
    this.loggedIn = false;
  }

  public createUser(newUser) {
    console.log("service check");
    return this._http.post("/user", newUser);
  }

  public createThread(newThread) {
    console.log("thread service check");
    return this._http.post("/thread", newThread);
  }

  public getUsers() {
    return this._http.get("/user");
  }

  public findUser(userID) {
    return this._http.get("/user/", userID);
  }
}
