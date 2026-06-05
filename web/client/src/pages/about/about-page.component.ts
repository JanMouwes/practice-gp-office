import {Component} from '@angular/core';

@Component({
  selector: 'app-about-page',
  template: `<section class="bg-light" id="main-content">
  <section>
    <h2>{{content.main.title}}</h2>
    <p class="text-light">{{content.main.body}}</p>
  </section>
  <section class="btn-group-horizontal">
    <a [href]="content.buttons.home.href" class="btn btn-primary">{{content.buttons.home.label}}</a>
    <a [href]="content.buttons.makeAppointment.href" class="btn btn-secondary">{{content.buttons.makeAppointment.label}}</a>
  </section>
</section>

  `
})
export class AboutPageComponent {
  content = {
    main: {
      title: 'Over ons',
      body: 'Deze website is bedoeld als Angular-oefenproject'
    },
    buttons: {
      home: {
        label: 'Terug naar Home',
        href: '/home'
      },
      makeAppointment: {
        label: 'Maak een afspraak',
        href: '/appointment'
      }
    }
  } as const
}
