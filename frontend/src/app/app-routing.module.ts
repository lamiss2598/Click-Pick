import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { roleGuard } from './guards/role.guard';
import { CommandesComponent } from './int-res/commandes/commandes.component';
import { IntResComponent } from './int-res/int-res.component';
import { MenuuComponent } from './int-res/menuu/menuu.component';
import { ProfilComponent } from './int-res/profil/profil.component';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { PanierComponent } from './panier/panier';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'panier', component: PanierComponent },

  { path: 'liste-restaurant', component: ListeRestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },

  {
    path: 'int-res',
    component: IntResComponent,
    canActivate: [roleGuard('RESTAURATEUR')],
    children: [
      { path: '', redirectTo: 'commandes', pathMatch: 'full' },
      { path: 'profil', component: ProfilComponent },
      { path: 'menu', component: MenuuComponent },
      { path: 'commandes', component: CommandesComponent },
    ],
  },

  // L'ancienne page « add-product » est remplacée par la gestion du menu du restaurateur.
  { path: 'add-product', redirectTo: 'int-res/menu', pathMatch: 'full' },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
