import {Component} from '@angular/core';
import {ContactForm} from "../../app/features/contact/contact-form/contact-form";

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  template: `
    <article class="bg-light" id="main-content">
      <h1>{{content.page.title}}</h1>
      <section class="flex-50-50">
        <section>
          <h2>{{content.main.title}}</h2>
          <h3 class="text-light">{{content.main.subtitle}}</h3>
          <p>{{content.main.body}}</p>
        </section>
        <app-contact-form></app-contact-form>
      </section>
    </article>
  `,
  styles: `


.flex-50-50 {
  display: flex;
  gap: 1em;
  justify-content: space-between;
}

.flex-50-50 > * {
  width: calc(50% - .5em);
}
  `
})
export class ContactPageComponent {
  content = {
    page: {title: 'Contact'},
    main: {
      title: 'Heeft u een vraag of opmerking?',
      subtitle: 'Neem dan contact met ons op!',
      body: 'Via het naastgelegen formulier kunt u uw vragen en opmerkingen indienen. We streven ernaar u nooit te beantwoorden.'
    },
    buttons: {
      home: {
        label: 'Terug naar Home',
        href: '/home'
      }
    }
  } as const
}
