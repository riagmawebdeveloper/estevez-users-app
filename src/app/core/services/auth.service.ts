import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_logged_in';

  // mock: usuario = admin, password = 1234
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
