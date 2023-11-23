import { Usuario } from "./Usuario";

export interface Turno {
    idEsp: string;
    idPac: string;
    instructor: Usuario;
    piloto: Usuario;
    // fecha: Date;
    fecha: any;
    instruccion: string;
    estado: string;
    reviewEsp: string;
    reviewPac: string;
    
    razon?: string;
}