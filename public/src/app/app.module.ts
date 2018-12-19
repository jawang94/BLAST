import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ChatService } from "./services/chat.service";
import { ModalService } from "./services/modal.service";
import { HttpService } from "./services/http.service";
import { DomService } from "./services/dom.service";
import { ThreadroomComponent } from "./threadroom/threadroom.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ThreadsComponent } from "./threads/threads.component";
import { JoinedthreadsComponent } from "./joinedthreads/joinedthreads.component";
import { CreatethreadComponent } from './createthread/createthread.component';
@NgModule({
  declarations: [
    AppComponent,
    ThreadroomComponent,
    NavbarComponent,
    ThreadsComponent,
    JoinedthreadsComponent,
    LoginComponent,
    CreatethreadComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ChatService, ModalService, HttpService, DomService],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
