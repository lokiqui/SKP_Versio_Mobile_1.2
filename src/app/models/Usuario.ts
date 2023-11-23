import { HistoriaVuelo } from "./HistoriaVuelo";

export interface Usuario {
    'nombre': string;
    'apellido': string;
    'edad': number;
    'dni': number;
    'email': string;
    'rol': string;

    'detallePerfil'?: string; // piloto
    'fotos'?: string[]; // piloto
    // 'historiaVuelo'?: HistoriaVuelo; // piloto
    'historiaVuelo'?: any; // piloto
    'aerodromos'?: string[]; // instructor
    'habilitado'?: boolean; // instructor
    'agenda'?: boolean[]; // instructor
    'foto'?: string; // instructor y administrador
}