import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { Turno } from 'src/app/models/Turno';
import { DocUsuario } from 'src/app/models/DocUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegistroService } from 'src/app/services/registro.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  docsUsuario!: Array<DocUsuario>;
  errorMsg:string = '';
  quieroAgregarUsuario:boolean = false;
  rolSeleccionado:string = 'piloto';
  verHistoriaVuelo: boolean = false;
  pilotoSeleccionado: any;
  turnos: Turno[] = [];
  verTurnos: boolean = false;
  
  constructor(
    private registroService: RegistroService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().snapshotChanges().subscribe(
      dcas => {
        this.docsUsuario = [];

        dcas.forEach(
          dca => {
            const data: any = dca.payload.doc.data();
            
            const docUsuario: DocUsuario = {
              id: dca.payload.doc.id,
              usuario: data
            };

            this.docsUsuario.push(docUsuario);
          }
        );
      } 
    )
  }
  
  usuarioSeleccionadoHandler(docUsuario: DocUsuario) {
    this.turnoService.getRef()
      .where('idPac', '==', docUsuario.id)
      .get()
      .then(
        qs => {
          this.turnos = [];
          this.verTurnos = false;

          qs.forEach((doc:any) => {
            const id: string = doc.id;
            const data: any = doc.data();
      
            this.turnos.push({...data, id});

            if (!this.verTurnos) {
              this.verTurnos = true;
            }
          });
        }
      );
  }

  exportarExcel(elementId: string, nombreArchivo: string) {
    /* pass here the table id */
    let element = document.getElementById(elementId);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, nombreArchivo + '.xlsx'); 
  }

  onChangeHabilitado($event:any) {
    const chequeado = $event.target.checked;
    const instructor = $event.target.value;

    this.usuarioService.updateInstructor(chequeado, instructor);
  }

  clickPilotoHandler() {
    this.rolSeleccionado = 'piloto';
  }
  clickInstructorHandler() {
    this.rolSeleccionado = 'instructor';
  }
  clickAdministradorHandler() {
    this.rolSeleccionado = 'administrador';
  }

  agregarUsuario() {
    this.quieroAgregarUsuario = true;
  }
  noAgregarUsuario() {
    this.quieroAgregarUsuario = false;    
  }

  instructorEnviadoHandler(objeto:any) {
    this.registroService.registrarInstructor(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }
  pilotoEnviadoHandler(objeto:any) {
    this.registroService.registrarPiloto(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }
  administradorEnviadoHandler(objeto:any) {
    this.registroService.registrarAdministrador(objeto)
    .catch(
      err => this.errorMsg = err.message
    );
  }

  verHistoriaVueloHandler(piloto: any) {
    this.pilotoSeleccionado = piloto;
    this.verHistoriaVuelo = true;
  }
  ocultarHandler() {
    this.verHistoriaVuelo = false;
  }

  eliminarUsuarioHandler(item: DocUsuario) {
    this.usuarioService.deleteUserData(item.id, item.usuario.rol)
  }
}
