import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsService } from '../../services/clients.service';
import { Client } from '../../../../shared/models/client.model';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ClientFormDialogComponent } from '../../components/client-form-dialog/client-form-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  private clientsService = inject(ClientsService);
  private dialog = inject(MatDialog);

  clients: Client[] = [];

  filterName = '';
  filterCompany = '';

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'company',
    'address',
    'createdAt',
    'actions',
  ];

  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.clientsService.clients$.subscribe((clients) => {
      this.clients = clients;
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    const name = this.filterName.toLowerCase();
    const company = this.filterCompany.toLowerCase();

    const filtered = this.clients.filter((c) => {
      const matchesName =
        !name || c.name.toLowerCase().includes(name);
      const matchesCompany =
        !company || c.company.toLowerCase().includes(company);
      return matchesName && matchesCompany;
    });

    this.dataSource.data = filtered;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.filterName = '';
    this.filterCompany = '';
    this.applyFilters();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientsService.addClient(result);

        this.dialog.open(AlertDialogComponent, {
          width: '360px',
          data: {
            title: 'Cliente creado',
            message: 'El cliente se ha creado con éxito.',
            buttonText: 'Cerrar',
          },
        });
      }
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '480px',
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientsService.updateClient(client.id, result);

        this.dialog.open(AlertDialogComponent, {
          width: '360px',
          data: {
            title: 'Cliente actualizado',
            message: 'El cliente se ha actualizado con éxito.',
            buttonText: 'Cerrar',
          },
        });
      }
    });
  }

  openDeleteDialog(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar cliente',
        message: `¿Seguro que deseas eliminar al cliente "${client.name}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.clientsService.deleteClient(client.id);

        this.dialog.open(AlertDialogComponent, {
          width: '360px',
          data: {
            title: 'Cliente eliminado',
            message: `El cliente "${client.name}" ha sido eliminado con éxito.`,
            buttonText: 'Cerrar',
          },
        });
      }
    });
  }
}
