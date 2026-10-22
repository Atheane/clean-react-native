import { IContact } from '@clean-rn/contact/domain';

export const mapContactExpoToContact = (contact: any): IContact => {
  let phone = '';
  if (contact.phoneNumbers)
    for (const phoneNumber of contact.phoneNumbers)
      if (phoneNumber.label === 'mobile') phone = phoneNumber.number;

  return { name: contact.name, phone: phone };
};
