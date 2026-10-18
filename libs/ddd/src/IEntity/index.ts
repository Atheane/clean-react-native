import short from 'short-uuid';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export class Entity<T> {
  public id: string;
  public properties: Partial<T>;

  protected constructor({ id, properties }: { id: string } & { properties: Partial<T> }) {
    this.id = id ?? short().new();
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

    // something weird with this condition
    return isEntity(object);
  }
}
