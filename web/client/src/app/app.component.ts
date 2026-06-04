import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./common/navbar/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gp-office-client';

  navLinks = [
    {title: 'home', href: '/home'},
    {title: 'over ons', href: '/about'},
    {title: 'maak een afspraak', href: '/appointment'},
    {title: 'contact', href: '/contact'}
  ]
}
