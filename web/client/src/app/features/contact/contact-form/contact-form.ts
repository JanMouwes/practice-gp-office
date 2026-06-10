import {Component, Inject, signal} from '@angular/core';
import {form, FormField, FormRoot} from "@angular/forms/signals";
import {ValidEmail} from "../contact-service/valid-email";
import {ContactService, DIToken} from "../contact-service/contact-service";

@Component({
  selector: 'app-contact-form',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="contactForm">
      <div>
        <label>
          {{content.nameInput.label}}
          <input type="text" [formField]="contactForm.name"/>
        </label>
        <label>
          {{content.emailInput.label}}
          <input type="text" [formField]="contactForm.email"/>
        </label>
        <label>
          {{content.messageInput.label}}
          <textarea [formField]="contactForm.message" rows="4"></textarea>
        </label>
      </div>
      <button role="button" type="submit" class="btn btn-primary">{{content.buttons.submit.label}}</button>
    </form>
  `,
  styles: `
form {
  padding: 1em 0;
  width: 100%;
}
label {
  display: block;
  padding: .5em 0;
  font-weight: bold;

  width: 100%;
  min-width: 10em;
  max-width: 25em;
}
label > input,textarea {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  resize: none;

  width: 100%;

  box-sizing: border-box;

  border:none;
  border-radius: 1em;
}`
})
export class ContactForm {
  content = {
    nameInput: {label: 'Naam'},
    emailInput: {label: 'E-mail'},
    messageInput: {label: 'Bericht'},
    buttons: {
      submit: {
        label: 'Versturen',
      },
    }
  };

  contactFormModel = signal<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });

  contactForm = form(this.contactFormModel, {
      submission: {
        action: async () => {
          await this.trySendMessage(
            this.contactForm.name().value(),
            this.contactForm.email().value(),
            this.contactForm.message().value()
          );
        }
      }
    }
  );

  // TODO real service
  constructor(@Inject(DIToken) private readonly contactService: ContactService) {}

  public async trySendMessage(name: string, email: string, message: string): Promise<void> {
    const parsedEmail = ValidEmail.parseEmail(email);
    if (this.isEmpty(name) || this.isEmpty(message) || parsedEmail === null) {
      return;
    }

    await this.contactService.sendContactMessage(name, parsedEmail, message);

    this.notifySuccess('message sent');
  }

  public notifySuccess(message: string) {
    window.alert('success: ' + message);
  }

  private isEmpty(str: string) {
    return str.length === 0;
  }
}

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}
