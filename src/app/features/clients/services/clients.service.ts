import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../../shared/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly STORAGE_KEY = 'clients_data';

  private clientsSubject = new BehaviorSubject<Client[]>(this.loadFromStorage());
  clients$ = this.clientsSubject.asObservable();

  private loadFromStorage(): Client[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Client[];
    } catch {
      return [];
    }
  }

  private saveToStorage(clients: Client[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients));
  }

  addClient(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
}): void {
  const current = this.clientsSubject.getValue();

  const newClient: Client = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    address: data.address,
    createdAt: new Date().toISOString(),
  };

  const updated = [...current, newClient];
  this.clientsSubject.next(updated);
  this.saveToStorage(updated);
}


  deleteClient(id: number): void {
    const current = this.clientsSubject.getValue();
    const updated = current.filter(c => c.id !== id);
    this.clientsSubject.next(updated);
    this.saveToStorage(updated);
  }

  // Dejamos preparado para edición por si luego la quieres implementar
  updateClient(id: number, partial: Partial<Client>): void {
    const current = this.clientsSubject.getValue();
    const updated = current.map(c =>
      c.id === id ? { ...c, ...partial } : c
    );
    this.clientsSubject.next(updated);
    this.saveToStorage(updated);
  }
}
