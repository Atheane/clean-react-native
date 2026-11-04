// Définition du gestionnaire d'événements (à placer dans un fichier séparé)
type EventCallback<T = any> = (data: T) => void;

export class DomainEventManager {
  private static instance: DomainEventManager;
  private listeners: Map<string, Set<EventCallback>>;

  private constructor() {
    this.listeners = new Map();
  }

  static getInstance(): DomainEventManager {
    if (!DomainEventManager.instance) {
      DomainEventManager.instance = new DomainEventManager();
    }
    return DomainEventManager.instance;
  }

  emit<T>(eventName: string, data: T): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners?.size) {
      eventListeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in domain event handler for ${eventName}:`, error);
        }
      });
    }
  }

  on<T>(eventName: string, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.listeners.get(eventName)?.add(callback);

    // Retourne une fonction de cleanup
    return () => this.off(eventName, callback);
  }

  off(eventName: string, callback: EventCallback): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName);
      }
    }
  }

  clearAllListeners(): void {
    this.listeners.clear();
  }
}

export const domainEventManager = DomainEventManager.getInstance();
