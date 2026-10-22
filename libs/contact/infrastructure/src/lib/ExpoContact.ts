import * as Contacts from 'expo-contacts';
//
import { Phone } from '@clean-rn/user/domain';
import { inplaceSortByName } from '@clean-rn/ui-mobile';

import { IContact, IAddContactCommand, IContactRepository, ContactError } from '@clean-rn/contact/domain';
//
import { mapContactExpoToContact } from '../mappers';

export class ExpoContact implements IContactRepository {
  private static instance: ExpoContact | null = null;

  // Make the constructor private to prevent direct instantiation
  private constructor() {
    this.getContacts = this.getContacts.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(): ExpoContact {
    if (!this.instance) this.instance = new ExpoContact();
    return this.instance;
  }

  async getContacts(): Promise<IContact[]> {
    const { status } = await Contacts.requestPermissionsAsync();
    const sortType = Contacts.SortTypes.FirstName;

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.Name],
        sort: sortType,
      });

      if (data.length > 0) {
        const contacts = data.map((contact: any) => mapContactExpoToContact(contact));
        inplaceSortByName(contacts);
        return contacts;
      }
    }

    return [];
  }

  async addContact(contact: IAddContactCommand): Promise<IContact> {
    const phone = new Phone(contact.phone, contact.countryCode);
    const newContact = {
      [Contacts.Fields.ContactType]: Contacts.ContactTypes.Person,
      [Contacts.Fields.FirstName]: contact.firstname,
      [Contacts.Fields.LastName]: contact.lastname,
      [Contacts.Fields.Name]: `${contact.firstname} ${contact.lastname}`,
      [Contacts.Fields.PhoneNumbers]: [
        {
          label: 'mobile',
          number: phone.valueInternational,
          countryCode: contact.countryCode,
        },
      ],
    };

    const contacts = await this.getContacts();
    if (contacts.find((c: IContact) => c.phone === phone.valueInternational))
      throw new ContactError.ContactAlreadyExists();

    await Contacts.addContactAsync(newContact);

    return {
      name: `${contact.firstname} ${contact.lastname}`,
      phone: phone.valueInternational,
    };
  }
}
