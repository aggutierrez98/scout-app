// Generated by https://quicktype.io

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
  patrullaId: string;
  funcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  edad: number;
  patrulla?: Patrulla;
  // insigniasObtenidas:    any[];
  // documentosPresentados: any[];
  // familiares:            any[];
}

export interface Patrulla {
  id: string;
  nombre: string;
  lema: string;
}

// Generated by https://quicktype.io

export interface LoginResponse {
  id: string;
  username: string;
  scout: Scout;
  role: string;
  token: string;
}

export interface ScoutsQueryParams {
  sexo: string;
  searchQuery: string;
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
}

export interface ScoutEditParams {
  funcion: string;
  religion: string;
  direccion: string;
  localidad: string;
  progresion?: string;
  patrullaId?: string;
  telefono?: string;
  email?: string;
}
