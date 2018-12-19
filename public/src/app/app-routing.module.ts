import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { JoinedthreadsComponent } from "./joinedthreads/joinedthreads.component";
import { ThreadroomComponent } from "./threadroom/threadroom.component";
import { ThreadsComponent } from "./threads/threads.component";

const routes: Routes = [
  {
    path: "threadroom",
    component: ThreadroomComponent
  },
  {
    path: "threads",
    component: ThreadsComponent
  },
  { path: "", pathMatch: "full", redirectTo: "home" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
