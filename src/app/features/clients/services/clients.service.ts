import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../../shared/models/client.model';

const DEFAULT_CLIENTS: Client[] = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@example.com',
    phone: '555-123-4567',
    company: 'Mendoza Logistics',
    address: 'Av. Reforma 123, CDMX',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Laura Gómez',
    email: 'laura.gomez@example.com',
    phone: '555-987-6543',
    company: 'Gómez Solutions',
    address: 'Calle 5 #432, Guadalajara',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Roberto Flores',
    email: 'roberto.flores@example.com',
    phone: '555-222-3344',
    company: 'Flores & Asociados',
    address: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Andrea Ruiz',
    email: 'andrea.ruiz@example.com',
    phone: '555-778-9900',
    company: 'Ruiz Tech',
    address: 'San Pedro, Monterrey',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Jorge Sánchez',
    email: 'jorge.sanchez@example.com',
    phone: '555-444-5566',
    company: 'Sánchez Marketing',
    address: 'Querétaro, QRO',
    createdAt: new Date().toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly STORAGE_KEY = 'clients_data';

  private clientsSubject = new BehaviorSubject<Client[]>(
    this.loadFromStorage()
  );
  clients$ = this.clientsSubject.asObservable();

  private loadFromStorage(): Client[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.saveToStorage(DEFAULT_CLIENTS);
      return DEFAULT_CLIENTS;
    }

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
    const updated = current.filter((c) => c.id !== id);
    this.clientsSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateClient(id: number, partial: Partial<Client>): void {
    const current = this.clientsSubject.getValue();
    const updated = current.map((c) =>
      c.id === id ? { ...c, ...partial } : c
    );
    this.clientsSubject.next(updated);
    this.saveToStorage(updated);
  }
}
