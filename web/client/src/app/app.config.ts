import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withNoIncrementalHydration} from '@angular/platform-browser';
import * as ContactService from "./features/contact/contact-service/contact-service";
import {ContactServiceStub} from "./features/contact/contact-service/contact-service-stub";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withNoIncrementalHydration()),
    {provide: ContactService.DIToken, useClass: ContactServiceStub}
  ]
};
