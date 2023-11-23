import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import * as Highcharts from 'highcharts';
import { Turno } from 'src/app/models/Turno';
import { InstruccionService } from 'src/app/services/instruccion.service';
import { Instruccion } from 'src/app/models/Instruccion';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-turnos-instruccion',
  templateUrl: './turnos-instruccion.component.html',
  styleUrls: ['./turnos-instruccion.component.scss']
})
export class TurnosInstruccionComponent implements OnInit {
  aerodromos: Instruccion[] = [];
  strInstrucciones: string[] = [];
  cantidades: number[] = [];

  renderizar: boolean = false;
  turnos: Turno[] = [];
  
  highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
     title: {
        text: "Cantidad de turnos por instruccion"
     },
     xAxis:{
        categories: this.strInstrucciones
     },
     yAxis: {
        title: {
           text:"Cantidad"
        }
     },
     series: [
        {
           name: 'Turnos',
           type: 'bar',
           data: this.cantidades
        }
     ]
  };

  constructor(
    private turnoService: TurnoService,
    private instruccionService: InstruccionService) { }

  ngOnInit(): void {
    this.instruccionService.getInstrucciones().pipe(
      switchMap(
        qs => {
          qs.forEach(
            qds => {
              const nombre = qds.data().nombre;
              const imagen = qds.data().imagen;
  
              this.aerodromos.push({nombre: nombre, imagen: imagen});
            }
          );  

          return this.turnoService.getRef().get()
        }
      ),
      map(
        qs => qs.forEach(
          qds => {
            const data: any = qds.data();
            this.turnos.push(data);
          }
        )
      )
    ).subscribe(
      () => {
        this.aerodromos.forEach(
          instruccion => {
            this.strInstrucciones.push(instruccion.nombre);
            let cantidad = 0;

            this.turnos.forEach(
              turno => {
                if (turno.instruccion === instruccion.nombre) {
                  cantidad++;
                }
              }
            );

            this.cantidades.push(cantidad);
          }
        );

        this.renderizar = true;
      }
    );
  }

}
