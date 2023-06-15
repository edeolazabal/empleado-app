import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss'],
})
export class RegistrarEmpleadoComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  addEmpleado(): void {
    const empleado: Empleado = {
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      apellido: this.myForm.get('apellido')!.value,
      email: this.myForm.get('email')!.value,
    };
    this.empleadoService.addEmpleado(empleado).subscribe({
      next: (data) => {
        this.snackBar.open('El empleado fue registrado con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/listaEmpleados']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}