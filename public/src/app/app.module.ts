import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChatService } from "./services/chat.service";
import { ThreadroomComponent } from './threadroom/threadroom.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThreadsComponent } from './threads/threads.component';
import { JoinedthreadsComponent } from './joinedthreads/joinedthreads.component';
@NgModule({
  declarations: [AppComponent, ThreadroomComponent, NavbarComponent, ThreadsComponent, JoinedthreadsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
