import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SalonComponent } from './salon/salon.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'salon/1', pathMatch: 'full' },
      { path: 'salon/:id', component: SalonComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
