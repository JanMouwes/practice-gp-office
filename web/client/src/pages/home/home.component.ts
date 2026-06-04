import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  content = contentNl
}

const contentNl = {
  main: {
    title: "Uw generieke huisarts",
    subtitle: "De beste in uw generieke stad",
  },
  sections: {
    welcome: {
      title: "Welkom",
      content: "Welkom op de website van de generieke huisarts! Hier vindt u alle informatie die u nodig heeft. "
    },
    makeAppointment: {
      title: "Afspraak maken",
      content: "Maak nu een afspraak via de knop hieronder!"
    },
    emergency: {
      title: "Bij spoed: bel 112",
      content: "Bel bij spoed of een levensbedreigende situatie altijd 112"
    }
  },
  buttons: {
    makeAppointment: {
      title: "Maak een afspraak",
      href: "/make-appointment"
    },
    contactUs: {
      title: "Contact",
      href: "/contact"
    }
  }
} as const

