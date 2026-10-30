import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'restaurants', component: ListeRestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
