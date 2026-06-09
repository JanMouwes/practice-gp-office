export class ValidEmail {
  private constructor(public readonly emailString: string) {}

  static parseEmail(email: string): ValidEmail | null {
    // email validation is messy, so we keep it super simple. Refer to: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const purposefullyNaiveRegex = /^\S.*@\S+\.\S+$/;

    if (!purposefullyNaiveRegex.test(email)) {
      return null;
    }

    return new ValidEmail(email);
  }
}
