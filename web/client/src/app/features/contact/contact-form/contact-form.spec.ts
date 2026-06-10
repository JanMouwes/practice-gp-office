import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactForm} from './contact-form';
import {ContactService, DIToken} from '../contact-service/contact-service';
import {beforeEach, describe, expect, it, vi} from "vitest";
import {By} from "@angular/platform-browser";
import {ValidEmail} from "../contact-service/valid-email";

describe('ContactForm', () => {
  const ContactServiceSpy = vi.fn(class implements ContactService {
    sendContactMessage = vi.fn();
  });

  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let serviceSpy: ContactService;

  beforeEach(async () => {
    serviceSpy = new ContactServiceSpy();

    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [
        {provide: DIToken, useValue: serviceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('send button', () => {
    function getSendButton() {
      return fixture.debugElement.query(By.css('[type=submit]'));
    }

    it('should call handler when clicked', async () => {
      const handler = vi.spyOn(component, 'trySendMessage');
      const btn = getSendButton();

      btn.nativeElement.click();
      await fixture.whenStable();

      expect(handler).toHaveBeenCalledOnce();
    });
  });

  describe('handleSendClicked', () => {
    it('should call ContactService with valid data', async () => {
      const notifySpy = vi.spyOn(component, 'notifySuccess')
      const testData = {
        name: 'test name',
        email: 'test@email.com',
        message: 'test message',
      };

      const expectedEmail = ValidEmail.parseEmail(testData.email);
      await component.trySendMessage(testData.name, testData.email, testData.message);

      expect(serviceSpy.sendContactMessage).toHaveBeenCalledExactlyOnceWith(
        testData.name,
        expectedEmail,
        testData.message
      );
      expect(notifySpy).toHaveBeenCalledOnce()
    });
    it.each([
        {name: '', email: 'test@email.com', message: 'test message'},
        {name: 'valid name', email: 'test@email.com', message: ''},
        {name: 'valid name', email: '', message: 'valid test message'},
      ]
    )('should not call ContactService with incomplete data', async (testData) => {
      await component.trySendMessage(testData.name, testData.email, testData.message);

      expect(serviceSpy.sendContactMessage).not.toHaveBeenCalled();
    });
  });
});


