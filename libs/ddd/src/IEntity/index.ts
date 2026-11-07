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
  protected emitDomainEvent(eventName: string): void {
    Entity.emitStaticDomainEvent(eventName, this);
  }

  protected static emitStaticDomainEvent<T>(eventName: string, entity: Entity<T>): void {
    console.log(eventName);
    domainEventManager.emit(eventName, entity);
  }
}
