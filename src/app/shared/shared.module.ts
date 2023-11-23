import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { SinVerificarComponent } from './sin-verificar/sin-verificar.component';
import { CancelarTurnoComponent } from './cancelar-turno/cancelar-turno.component';
import { FinalizarTurnoComponent } from './finalizar-turno/finalizar-turno.component';
import { ReviewComponent } from './review/review.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { CalificarAtencionComponent } from './calificar-atencion/calificar-atencion.component';
import { RechazarTurnoComponent } from './rechazar-turno/rechazar-turno.component';

import { RegistroInstructorComponent } from '../bienvenida/registro/registro-instructor/registro-instructor.component';
import { RegistroPilotoComponent } from '../bienvenida/registro/registro-piloto/registro-piloto.component';
import { RegistroComponent } from '../bienvenida/registro/registro.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { HistoriaVueloComponent } from './historia-clinica/historia-clinica.component';
import { HomeComponent } from './home/home.component';
import { FavbuttonUsuariosComponent } from './favbutton-usuarios/favbutton-usuarios.component';
import { PilotosTurnosComponent } from './pilotos-turnos/pilotos-turnos.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { MisAtencionesComponent } from './mis-atenciones/mis-atenciones.component';
import { ProfesorPipe } from '../pipes/profesor.pipe';
import { EjercicioADirective } from '../directives/ejercicio-a.directive';
import { EjercicioBDirective } from '../directives/ejercicio-b.directive';
import { EjercicioCDirective } from '../directives/ejercicio-c.directive';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroInstructorComponent,
    RegistroPilotoComponent,
    SinVerificarComponent,
    CancelarTurnoComponent,
    FinalizarTurnoComponent,
    ReviewComponent,
    MisTurnosComponent,
    CalificarAtencionComponent,
    RechazarTurnoComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,
    HistoriaVueloComponent,
    HomeComponent,
    FavbuttonUsuariosComponent,
    PilotosTurnosComponent,
    MisHorariosComponent,
    MisAtencionesComponent,
    ProfesorPipe,
    EjercicioADirective,
    EjercicioBDirective,
    EjercicioCDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegistroComponent,
    RegistroInstructorComponent,
    RegistroPilotoComponent,
    SinVerificarComponent,
    MisTurnosComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,
    HistoriaVueloComponent,
    HomeComponent,
    FavbuttonUsuariosComponent,
    PilotosTurnosComponent,
    ReviewComponent,
    ProfesorPipe,
    EjercicioADirective,
    EjercicioBDirective,
    EjercicioCDirective
  ]
})
export class SharedModule { }
