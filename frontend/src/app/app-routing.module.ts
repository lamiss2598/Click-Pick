import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { IntResComponent } from './int-res/int-res.component';
import { ProfilComponent} from './int-res/profil/profil.component';
import { MenuuComponent } from './int-res/menuu/menuu.component';
import { CommandesComponent } from './int-res/commandes/commandes.component';
const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'restaurants', component: ListeRestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'int-res', component: IntResComponent ,children: [
    { path: '', redirectTo: 'profil', pathMatch: 'full' },
    { path: 'profil', component: ProfilComponent },
    { path: 'menu', component: MenuuComponent },
    { path: 'commandes', component: CommandesComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
