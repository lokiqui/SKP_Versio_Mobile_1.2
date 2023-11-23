import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Pipe({
  name: 'profesor'
})
export class ProfesorPipe implements PipeTransform {

  transform(value: Usuario): string {
    return '' + value.apellido + ', ' + value.nombre;
  }

}
