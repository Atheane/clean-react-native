import { IContact, Phone } from '@clean-rn/contact/domain';
import { Contact } from 'expo-contacts';
import { getLocales } from 'expo-localization';
import { UUID } from 'uuidjs';

import { Logger } from '@clean-rn/logger';

const locales = getLocales();

export const mapContactExpoToContact = (contact: Contact): IContact | undefined => {
  try {
    if (contact.phoneNumbers === undefined) return;
    for (const phoneNumber of contact.phoneNumbers) {
      if (phoneNumber.number === undefined) return;
      if (phoneNumber.label !== 'mobile') return;
      const defaultCountry = locales[0]?.regionCode;
      const id = UUID.generate();
      return {
        id,
        name: contact.name,
        phone: new Phone(phoneNumber.number, defaultCountry as string),
      };
    }
  } catch (error: unknown) {
    Logger.getInstance().info(error);
    return;
  }
};
