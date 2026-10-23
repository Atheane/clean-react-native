import * as Contacts from 'expo-contacts';
import { UUID } from 'uuidjs';

import { Phone } from '@clean-rn/contact/domain';
import { inplaceSortByName } from '@clean-rn/utils';

import { IContact, IAddContactCommand, IContactRepository, ContactError } from '@clean-rn/contact/domain';

import { mapContactExpoToContact } from '../mappers';

export class ExpoContact implements IContactRepository {
  private static instance: ExpoContact | null = null;

  // Make the constructor private to prevent direct instantiation
  private constructor() {
    this.getContacts = this.getContacts.bind(this);
    this.addContact = this.addContact.bind(this);
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
        const contacts = data
          .map(mapContactExpoToContact)
          .filter((contact) => contact !== undefined) as IContact[];
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
          countryCode: phone.countryCode,
        },
      ],
    };

    const contacts = await this.getContacts();

    if (contacts.find((c: IContact) => c.phone.valueInternational === phone.valueInternational))
      throw new ContactError.ContactAlreadyExists();

    await Contacts.addContactAsync(newContact);
    const id = UUID.generate();

    return {
      id,
      name: `${contact.firstname} ${contact.lastname}`,
      phone,
    };
  }
}
