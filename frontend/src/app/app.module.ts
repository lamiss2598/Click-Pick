import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeRestaurantComponent } from './liste-restaurant/liste-restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroBannerComponent } from './home/hero-banner/hero-banner.component';
import { CategoryFilterComponent } from './home/category-filter/category-filter.component';
import { RestaurantCardComponent } from './home/restaurant-card/restaurant-card.component';
import { RestaurantListComponent } from './home/restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeRestaurantComponent,
    MenuComponent,
    NavbarComponent,
    HomeComponent,
    HeroBannerComponent,
    CategoryFilterComponent,
    RestaurantCardComponent,
    RestaurantListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
