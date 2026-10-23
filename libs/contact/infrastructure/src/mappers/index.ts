import { IContact, Phone } from '@clean-rn/contact/domain';
import { Contact } from 'expo-contacts';
import * as Sentry from '@sentry/react-native';

export const mapContactExpoToContact = (contact: Contact): IContact | undefined => {
  try {
    if (contact.phoneNumbers === undefined) return;
    for (const phoneNumber of contact.phoneNumbers) {
      if (phoneNumber.number === undefined) return;
      if (phoneNumber.label !== 'mobile') return;
      return {
        name: contact.name,
        phone: new Phone(phoneNumber.number),
      };
    }
  } catch (error: unknown) {
    Sentry.captureException(error);
    return;
  }
};
