import * as Contacts from 'expo-contacts';
//
import { IContact, IContactAddCommand, IContactRepository } from '@clean-rn/contact/domain';
//
import { mapContactExpoToContact } from '../mappers';

export class ExpoContact implements IContactRepository {
  private static instance: ExpoContact | null = null;

  // Make the constructor private to prevent direct instantiation
  private constructor() {
    this.getContact = this.getContact.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(): ExpoContact {
    if (!this.instance) this.instance = new ExpoContact();
    return this.instance;
  }

  async getContact(): Promise<IContact[]> {
    const { status } = await Contacts.requestPermissionsAsync();
    const sortType = Contacts.SortTypes.FirstName;

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.Name],
        sort: sortType,
      });

      if (data.length > 0) return data.map((contact: any) => mapContactExpoToContact(contact));
    }

    return [];
  }

  async addContact(contact: IContactAddCommand): Promise<IContact> {
    const newContact = {
      [Contacts.Fields.ContactType]: Contacts.ContactTypes.Person,
      [Contacts.Fields.FirstName]: contact.firstname,
      [Contacts.Fields.LastName]: contact.lastname,
      [Contacts.Fields.Name]: `${contact.firstname} ${contact.lastname}`,
      [Contacts.Fields.PhoneNumbers]: [
        {
          label: 'mobile',
          number: contact.phone,
        },
      ],
    };
    await Contacts.addContactAsync(newContact);

    return {
      name: `${contact.firstname} ${contact.lastname}`,
      phone: contact.phone,
    };
  }
}
