import {ContactService} from "./contact-service";
import {ValidEmail} from "./valid-email";

export class ContactServiceStub implements ContactService {
  async sendContactMessage(name: string, email: ValidEmail, message: string): Promise<void> {
    return;
  }
}
