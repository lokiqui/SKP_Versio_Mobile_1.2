import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';
import { HistoriaVuelo } from 'src/app/models/HistoriaVuelo';
import { Turno } from 'src/app/models/Turno';

@Component({
  selector: 'app-pilotos-turnos',
  templateUrl: './pilotos-turnos.component.html',
  styleUrls: ['./pilotos-turnos.component.scss']
})
export class PilotosTurnosComponent implements OnInit {
  @Input() turnos!: Turno[];
  @Output() reviewSeleccionada = new EventEmitter();
  @Output() historiaVueloSeleccionada = new EventEmitter();

  turnosOriginal!: Turno[];
  filtro: string = '';

  modoNormal: boolean = true;
  modoReview: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.turnosOriginal = this.turnos;
  }

  filtrar() {
    if (this.filtro === '') {
      this.turnos = this.turnosOriginal.slice();
    }
    else {
      const filtrados: any[] = [];

      this.turnosOriginal.forEach(
        turno => {
          if(turno.instruccion.includes(this.filtro)) {
            filtrados.push(turno);
          }
          // else if (turno.piloto.historiaVuelo) {
          //   const hc: Object = turno.piloto.historiaVuelo;
          //   let existe: boolean = false;

          //   hc.forEach(
          //     (dato: string) => {
          //       if (dato.includes(this.filtro)) {
          //         existe = true;
          //       }
          //     }
          //   );
          //   if (existe) {
          //     filtrados.push(turno);
          //   }
          // }
        }
      )

      this.turnos = filtrados.slice();
    }
  }

  volverHandler() {
    this.modoNormal = true;
    this.modoReview= false;
  }

  verReview(turno: Turno) {
    this.reviewSeleccionada.emit(turno);
  }

}
