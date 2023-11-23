import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PilotoComponent } from './piloto.component';
import { MenuPilotoComponent } from './menu-piloto/menu-piloto.component';
import { MisTurnosComponent } from '../shared/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from '../shared/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from '../shared/solicitar-turno/solicitar-turno.component';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  { path: '', component: PilotoComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'mi-perfil', component: MiPerfilComponent },
    { path: 'mis-turnos', component: MisTurnosComponent },
    { path: 'solicitar-turno', component: SolicitarTurnoComponent }
  ]}
];

@NgModule({
  declarations: [
    PilotoComponent,
    MenuPilotoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PilotoModule { }
