import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  public createUser(newUser) {
    return this._http.post("/user", newUser);
  }

  public getUsers() {
    return this._http.get("/user");
  }

  public findUser(userID) {
    return this._http.get("/user/", userID);
  }
}
