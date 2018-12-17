import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { JoinedthreadsComponent } from "./joinedthreads/joinedthreads.component";
import { ActiveusersComponent } from "./activeusers/activeusers.component";
import { ThreadroomComponent } from "./threadroom/threadroom.component";
import { ThreadsComponent } from "./threads/threads.component";

const routes: Routes = [
  { 
    path: "home", 
    component: NavbarComponent,
  },
  {
    path: "app/activeusers",
    component: ActiveusersComponent
  },
  {
    path: "app/threadroom",
    component: ThreadroomComponent
  },
  {
    path: "app/threads",
    component: JoinedthreadsComponent
  },
  {
    path: "home",
    component: JoinedthreadsComponent
  },
  { path: "", pathMatch: "full", redirectTo: "home" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
