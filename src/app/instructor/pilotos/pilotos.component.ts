import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { Usuario } from 'src/app/models/Usuario';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent implements OnInit {
  // usuarios:Array<any> = [];
  docsUsuario: DocUsuario[] = [];
  verHistoriaVuelo: boolean = false;
  pilotoSeleccionado!: Usuario;

  miUid!: string;
  turnos!: Turno[];
  verTurnos: boolean = false;
  turnoSeleccionado!: Turno;

  modoNormal: boolean = true;
  modoReview: boolean = false;

  constructor(
    private turnoService: TurnoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserID().subscribe(
      uid => {
        this.miUid = uid;

        this.turnoService.getRef()
        .where('idEsp', '==', this.miUid)
        .where('estado', '==', 'realizado')
        .get()
        .then(
          qs => {
            qs.forEach(doc => {
              const objeto: any = doc.data();
              const idPiloto = objeto.idPac;
              const piloto = objeto.piloto;

              const some = this.docsUsuario.some(
                auxUsuario => auxUsuario.id == idPiloto
              );

              if (!some) {
                this.docsUsuario.push({id: idPiloto, usuario: piloto});
              }
            });
      })
    })
  }

  usuarioSeleccionadoHandler(docUsuario: DocUsuario) {
    this.turnoService.getRef()
      .where('idEsp', '==', this.miUid)
      .where('idPac', '==', docUsuario.id)
      .where('estado', '==', 'realizado')
      .get()
      .then(
        qs => {
          this.turnos = [];
          qs.forEach(
            doc => {
              const turno: any = doc.data();
              this.turnos.push(turno);
            }
          )
          this.verTurnos = true;
        }
      )
  }

  reviewSeleccionadaHandler(turno: Turno) {
    this.turnoSeleccionado = turno;

    this.modoNormal = false;
    this.modoReview = true;
  }

  volverHandler() {
    this.modoNormal = true;
    this.modoReview= false;
  }
  
  verHistoriaVueloHandler(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.pilotoSeleccionado = this.turnoSeleccionado.piloto;
    this.verHistoriaVuelo = true;
  }

  ocultarHandler() {
    this.verHistoriaVuelo = false;
  }
}
