import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InstructorComponent } from './instructor.component';
import { MenuInstructorComponent } from './menu-instructor/menu-instructor.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { PilotosComponent } from './pilotos/pilotos.component';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  { path: '', component: InstructorComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'pilotos', component: PilotosComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'mis-turnos', component: MisTurnosComponent }
  ]}
];

@NgModule({
  declarations: [
    InstructorComponent,
    MenuInstructorComponent,
    PilotosComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InstructorModule { }
