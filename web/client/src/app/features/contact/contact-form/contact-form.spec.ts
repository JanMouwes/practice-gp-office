import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactForm} from './contact-form';
import {ContactService, DIToken} from '../contact-service/contact-service';
import {beforeEach, describe, expect, it, Mocked, vi} from "vitest";

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let contactServiceSpy: Mocked<ContactService> = createContactServiceSpy()

  beforeEach(async () => {
    contactServiceSpy = createContactServiceSpy()

    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [{provide: DIToken, useValue: contactServiceSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendContactMessage', () => {
    it('should call ContactService with valid data', async () => {
      const testData = {
        name: 'test name',
        email: 'test@email.com',
        message: 'test message',
      }

      await component.sendContactMessage(testData.name, testData.email, testData.message);

      expect(contactServiceSpy.sendContactMessage).toHaveBeenCalledExactlyOnceWith(
        testData.name,
        testData.email,
        testData.message
      )
    });
    it.each([
        {name: '', email: 'test@email.com', message: 'test message'},
        {name: 'valid name', email: 'test@email.com', message: ''},
        {name: 'valid name', email: '', message: 'valid test message'},

        {name: 'valid name', email: 'invalid email', message: 'valid test message'},
        {name: 'valid name', email: 'no-tld@email', message: 'valid test message'},
        {name: 'valid name', email: 'trailing-dot@email.', message: 'valid test message'},
        {name: 'valid name', email: '@no-name.nl', message: 'valid test message'},
        {name: 'valid name', email: 'bad-domain@.nl', message: 'valid test message'},
      ]
    )('should not call ContactService with invalid data', async (testData) => {
      await component.sendContactMessage(testData.name, testData.email, testData.message);

      expect(contactServiceSpy.sendContactMessage).not.toHaveBeenCalled()
    });
  });
});

function createContactServiceSpy() {
  return {
    sendContactMessage: vi.fn()
  }
}
