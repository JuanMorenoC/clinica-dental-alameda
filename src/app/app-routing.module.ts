import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from './agenda/agenda.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent, // another child route component that the router renders
  },
  {
    path: 'home',
    component: HomeComponent, // another child route component that the router renders
  },
  {
    path: '',
    component: AppComponent, // another child route component that the router renders
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
