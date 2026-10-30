import ShortUniqueId from 'short-unique-id';
import { domainEventManager } from '../DomainEventManager';

// Modification de la classe Entity
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public id: string;
  public properties: Partial<T>;

  protected constructor({ id, properties }: { id?: string } & { properties: Partial<T> }) {
    this.id = id ?? new ShortUniqueId({ length: 8 }).rnd();
    this.initProperties();
    this.properties = properties;
  }

  protected initProperties(): void {
    this.properties = {} as T;
  }

  protected equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return isEntity(object);
  }

  // Nouvelle méthode pour émettre des événements du domaine

  protected emitDomainEvent(eventName: string, data: any): void {
    Entity.emitStaticDomainEvent(eventName, { ...data, entityId: this.id });
  }

  protected static emitStaticDomainEvent(eventName: string, data: any): void {
    console.log(eventName, data);
    domainEventManager.emit(eventName, data);
  }
}
