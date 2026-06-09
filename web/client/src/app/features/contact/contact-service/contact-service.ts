import {InjectionToken} from "@angular/core";

export const DIToken = new InjectionToken<ContactService>("ContactService")
export interface ContactService {
  sendContactMessage(name: string, email: string, message: string): Promise<void>;
}
