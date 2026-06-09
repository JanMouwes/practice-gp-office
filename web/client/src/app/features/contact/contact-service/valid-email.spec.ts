import {describe, expect, it} from "vitest";
import {ValidEmail} from "./valid-email";

describe('ValidEmail', () => {
  describe('parseEmail', () => {
    it.each([
        'valid@email.com',
        '"with space"@example.com',
      ]
    )('should accept valid emails', async (email) => {
      const actual = ValidEmail.parseEmail(email);

      expect(actual).not.toBeNull();
      if (actual !== null) {
        expect(actual.emailString).toEqual(email);
      }
    });

    it.each([
        '',
        'invalid email',
        'no-tld@email',
        'trailing-dot@email.',
        '@no-name.nl',
        'bad-domain@.nl',
      ]
    )('should reject invalid emails', async (email) => {
      const actual = ValidEmail.parseEmail(email);

      expect(actual).toBeNull();
    });
  })
});
