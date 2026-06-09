import {InjectionToken} from "@angular/core";
import {ValidEmail} from "./valid-email";

export const DIToken = new InjectionToken<ContactService>("ContactService");

export interface ContactService {
  sendContactMessage(name: string, email: ValidEmail, message: string): Promise<void>;
}
