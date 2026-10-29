// Définition du gestionnaire d'événements (à placer dans un fichier séparé)
type EventCallback = (data: any) => void;

export class DomainEventManager {
  private static instance: DomainEventManager;
  private listeners: { [eventName: string]: EventCallback[] };

  private constructor() {
    this.listeners = {};
  }

  static getInstance(): DomainEventManager {
    if (!DomainEventManager.instance) {
      DomainEventManager.instance = new DomainEventManager();
    }
    return DomainEventManager.instance;
  }

  emit(eventName: string, data: any): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data));
    }
  }

  on(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  off(eventName: string, callback: EventCallback): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter((cb) => cb !== callback);
    }
  }
}

export const domainEventManager = DomainEventManager.getInstance();
