import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { IntResComponent } from './int-res/int-res.component';

import { ProfilComponent } from './int-res/profil/profil.component';
import { MenuuComponent } from './int-res/menuu/menuu.component';
import { CommandesComponent } from './int-res/commandes/commandes.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroBannerComponent } from './home/hero-banner/hero-banner.component';
import { CategoryFilterComponent } from './home/category-filter/category-filter.component';
import { RestaurantCardComponent } from './home/restaurant-card/restaurant-card.component';
import { RestaurantListComponent } from './home/restaurant-list/restaurant-list.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeRestaurantComponent,
    MenuComponent,
    IntResComponent,
    ProfilComponent,
    MenuuComponent,
    CommandesComponent,
    NavbarComponent,
    HomeComponent,
    HeroBannerComponent,
    CategoryFilterComponent,
    RestaurantCardComponent,
    RestaurantListComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
