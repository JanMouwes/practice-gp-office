import {Component, Inject} from '@angular/core';
import {ContactService, DIToken} from "../contact-service/contact-service";
import {ValidEmail} from "../contact-service/valid-email";

@Component({
  selector: 'app-contact-form',
  template: `
    <form>
      <div>
        <label>
          {{content.nameInput.label}}
          <input type="text" />
        </label>
        <label>
          {{content.emailInput.label}}
          <input type="text" />
        </label>
        <label>
          {{content.messageInput.label}}
          <textarea></textarea>
        </label>
      </div>
      <button type="submit" class="btn btn-primary">{{content.buttons.submit.label}}</button>
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
  constructor(@Inject(DIToken) private readonly contactService: ContactService) {

  }

  // TODO service, binding

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

  async sendContactMessage(name: string, email: string, message: string) {
    const parsedEmail = ValidEmail.parseEmail(email);
    if (this.isEmpty(name) || this.isEmpty(message) || parsedEmail === null) {
      return;
    }

    await this.contactService.sendContactMessage(name, parsedEmail, message);
  }

  private isEmpty(str: string) {
    return str.length === 0;
  }
}
