import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') ?? 'null');

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  get initials(): string {
    if (!this.loggedUser?.name) return '?';

    const parts: string[] = this.loggedUser.name.split(' ');

    return parts
      .filter((p: string) => p.trim().length > 0)
      .map((p: string) => p[0])
      .join('')
      .toUpperCase();
  }
}
