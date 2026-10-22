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
    console.log('-- GET CONTACTS --');
    const { status } = await Contacts.requestPermissionsAsync();
    const sortType = Contacts.SortTypes.FirstName;

    if (status === 'granted') {
      console.log('-- GET CONTACTS -- CONTACTS GRANTED');
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.Name],
        sort: sortType,
      });

      if (data.length > 0) {
        console.log(data[0]);
        return data.map((contact: any) => mapContactExpoToContact(contact));
      }
    }

    console.log('-- GET CONTACTS -- CONTACTS NOT GRANTED');
    return [];
  }

  // async addContact(contact: IContactAddCommand): Promise<IContact> {}
}
