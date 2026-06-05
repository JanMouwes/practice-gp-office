import {Routes} from '@angular/router';
import {HomeComponent} from "../pages/home/home.component";
import {AboutPageComponent} from "../pages/about/about-page.component";
import {ContactPageComponent} from "../pages/contact/contact-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'contact', component: ContactPageComponent},
];
