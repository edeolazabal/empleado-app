import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'actions'];
  dataSource = new MatTableDataSource<Empleado>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private empleadoService: EmpleadoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe((data: Empleado[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteEmpleado(id: number) {
    this.empleadoService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((e: Empleado) => {
        this.snackBar.open('El empleado fue eliminado con exito!', '', {
          duration: 3000,
        });
        return e.id !== id ? e : false;
      });
    });
    console.log(this.dataSource.data);
  }

  showDialog(id: number): void {
    this.dialog
      .open(DialogComponent, {
        data: `¿Deseas eliminar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deleteEmpleado(id);
        } 
      });
  }
}