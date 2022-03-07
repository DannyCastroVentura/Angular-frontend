import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero/details/:id', component: HeroDetailComponent },
  { path: 'hero/edit/:id', component: HeroEditComponent },
  { path: 'addHero', component: AddHeroComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
