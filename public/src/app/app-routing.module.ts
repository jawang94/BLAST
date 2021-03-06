import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { JoinedthreadsComponent } from "./joinedthreads/joinedthreads.component";
import { ThreadroomComponent } from "./threadroom/threadroom.component";
import { ThreadsComponent } from "./threads/threads.component";
import { CreatethreadComponent } from "./createthread/createthread.component";

const routes: Routes = [
  {
    path: "threadroom/:id",
    component: ThreadroomComponent
  },
  {
    path: "createthread",
    component: CreatethreadComponent
  },
  {
    path: "home",
    component: ThreadsComponent
  },
  { path: "", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
