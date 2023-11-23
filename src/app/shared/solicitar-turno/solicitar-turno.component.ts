import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instruccion } from 'src/app/models/Instruccion';
import { Usuario } from 'src/app/models/Usuario';
import { animaciones } from 'src/app/others/animaciones';
import { InstruccionService } from 'src/app/services/instruccion.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  animations: animaciones
})
export class SolicitarTurnoComponent implements OnInit {
  aerodromos: Instruccion[] = [];

  instructores: any[] = [];
  pilotos: any[] = [];

  paso0: boolean = false;
  paso1: boolean = false;
  paso2: boolean = false;
  paso3: boolean = false;
  paso4: boolean = false;
  paso5: boolean = false;

  arrayDeArraysDeFechas: Array<Array<Date|null>> = [];
  idEsp: string = '';
  idPac: string = '';
  franjaHoraria: number[] = [];

  pilotoElegido: any;
  instruccionElegida: string = '';
  instructorElegido!: Usuario;
  fechaElegida: Date | null = null;

  usuarioActual: any;
  uid: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private turnoService: TurnoService,
    private otroService: OtroService,
    private instruccionService: InstruccionService) { }

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
        this.uid = ds.id;
        this.usuarioActual = ds.data();

        if (this.usuarioActual.rol === 'piloto') {
          this.paso1 = true;
        }
        else if (this.usuarioActual.rol === 'administrador') {
          this.paso0 = true;

          this.usuarioService.getUsuariosRef().where('rol', '==', 'piloto').get()
            .then(
              qs => {
                qs.forEach(
                  doc => {              
                    const obj:any = {
                      id: doc.id,
                      data: doc.data()
                    }

                    this.pilotos.push(obj);
                  }
                )
              }
            )
        }
      }
    );

    this.instruccionService.getInstrucciones().subscribe(
      qs => qs.forEach(
        qds => {
          const esp: any = qds.data();
          this.aerodromos.push(esp);
        }
      )
    );

    for(let i = 8; i < 19; i++)
      this.franjaHoraria.push(i);
  }

  rellenarHorarios() {
    const reservas: number[] = [];
    
    this.reservaService.getRef().where("uid", "==", this.idEsp).get().then(
      qs => qs.forEach(
        doc => reservas.push(doc.get("fecha").toDate().valueOf())
      )
    )
    .then(
      () => {
        for(let i = 0; i < 15; i++) {
          const fecha = new Date();
          fecha.setDate(fecha.getDate() + i);
          this.arrayDeArraysDeFechas.push([]);

          const dia = fecha.getDay();
          const horas = dia !== 6 ? 19 : 14;

          if (this.instructorElegido.agenda) {
            if (this.instructorElegido.agenda[dia]) {
              for(let j = 8; j < horas; j++) {
                const nuevaFecha = new Date(fecha);
                nuevaFecha.setHours(j, 0, 0, 0);

                if (reservas.indexOf(nuevaFecha.valueOf()) < 0) {
                  this.arrayDeArraysDeFechas[i].push(nuevaFecha);
                }
                else {
                  // Sirve para generar el <td> vacío,
                  // pero quizá sea mejor manejarlo en el template
                  this.arrayDeArraysDeFechas[i].push(null);
                }
              }
            }
          }
        }
      }
    )
  }

  onPilotoSeleccionadoHandler(piloto: any) {
    this.paso0 = false;
    this.paso1 = true;

    this.pilotoElegido = piloto.data;
    this.idPac = piloto.id;
  }

  onInstruccionSeleccionadaHandler(instruccion
: Instruccion) {
    this.instruccionElegida = instruccion.nombre;

    this.usuarioService
      .getUsuariosRef()
      .where('rol', '==', 'instructor')
      .where('aerodromos', 'array-contains', this.instruccionElegida)
      .get()
      .then(
        qs => {
          qs.forEach(
            doc => {              
              const obj:any = {
                id: doc.id,
                data: doc.data()
              }

              this.instructores.push(obj);
            }
          )
          this.paso1 = false;
          this.paso2 = true;
        }
      )
  }

  onInstructorSeleccionadoHandler(instructor: any) {
    this.paso2 = false;
    this.paso3 = true;

    this.instructorElegido = instructor.data;
    this.idEsp = instructor.id;

    this.rellenarHorarios();
  }

  onFechaSeleccionadaHandler(fecha: Date) {
    this.paso3 = false;
    this.paso4 = true;

    this.fechaElegida = fecha;
  }

  onCancelarReservaHandler() {
    this.paso3 = true;
    this.paso4 = false;

    this.fechaElegida = null;
  }

  onConfirmarReservaHandler() {
    if (this.fechaElegida) {
      this.reservaService.add(this.idEsp, this.fechaElegida).then(
        () => this.agregarTurno()
      );
    }
  }

  agregarTurno() {
    if (this.usuarioActual.rol === 'piloto') {
      this.pilotoElegido = this.usuarioActual;
      this.idPac = this.uid;
    }

    const turno = {
      idPac: this.idPac,
      piloto: this.pilotoElegido,
      idEsp: this.idEsp,
      instructor: this.instructorElegido,
      fecha: this.fechaElegida,
      instruccion
: this.instruccionElegida,
      estado: 'reservado'
    }

    this.turnoService.add(turno).then(
      () => {
        this.paso4 = false;
        this.paso5 = true;
      }
    )
  }

  regresar() {
    if (this.usuarioActual.rol === 'piloto') {
      this.router.navigateByUrl('/piloto/mis-turnos');
    }
    else if (this.usuarioActual.rol === 'administrador') {
      this.router.navigateByUrl('/administrador/turnos');
    }
  }

}