import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../../shared/mocks/auth.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_logged_in';

  // mock: usuario = admin, password = 1234
  login(username: string, password: string): boolean {
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return false;

    localStorage.setItem(this.STORAGE_KEY, 'true');
    localStorage.setItem('loggedUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
