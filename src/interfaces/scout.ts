import { FamiliarWithRelacion } from "./familiar";

export interface Scout {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  dni: string;
  sexo: string;
  localidad: string;
  direccion: string;
  telefono: string;
  mail: string | null;
  progresionActual: string;
  religion: string;
  equipoId: string;
  funcion: string;
  rama: string
  fechaCreacion: string;
  fechaActualizacion: string;
  edad: number;
  equipo?: Equipo;
  familiares?: FamiliarWithRelacion[]
  // insigniasObtenidas:    any[];
  // documentosPresentados: any[];
  // familiares:            any[];
}

export interface Equipo {
  id: string;
  nombre: string;
  lema: string;
  rama: string
}

export interface LoginResponse {
  id: string;
  username: string;
  scout: Scout;
  role: string;
  token: string;
}

export interface FirstLoginResponse {
  id: string;
  username: string;
  role: string;
}

export interface ScoutsQueryParams {
  sexo: string;
  searchQuery: string;
  equipos: string[];
  progresiones: string[];
  funciones: string[];
  ramas: string[];
}

export interface ScoutEditParams {
  funcion: string;
  religion: string;
  direccion: string;
  localidad: string;
  progresion?: string;
  equipoId?: string;
  telefono?: string;
  email?: string;
}
