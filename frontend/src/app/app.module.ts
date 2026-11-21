import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CategoryFilterComponent } from './home/category-filter/category-filter.component';
import { HeroBannerComponent } from './home/hero-banner/hero-banner.component';
import { RestaurantCardComponent } from './home/restaurant-card/restaurant-card.component';
import { RestaurantListComponent } from './home/restaurant-list/restaurant-list.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CommandesComponent } from './int-res/commandes/commandes.component';
import { IntResComponent } from './int-res/int-res.component';
import { MenuuComponent } from './int-res/menuu/menuu.component';
import { ProfilComponent } from './int-res/profil/profil.component';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { PanierComponent } from './panier/panier';
import { NavbarComponent } from './shared/navbar/navbar.component';

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
    AuthComponent,
    PanierComponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
