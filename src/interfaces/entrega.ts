// Generated by https://quicktype.io

export interface Entrega {
  id: string;
  scoutId: string;
  tipoEntrega: string;
  fechaEntrega: string;
  fechaCreacion: string;
  scout: ScoutEntrega;
}

export interface ScoutEntrega {
  nombre: string;
  apellido: string;
  dni: string;
  funcion: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
}

export interface EntregasQueryParams {
  searchQuery: string;
  tiempoDesde: Date;
  tiempoHasta: Date;
  tipoEntregasSelected: string[];
  equipos: string[];
  progresiones: string[];
  funciones: string[];
}

export interface EntregaEditParams {
  scoutId: string;
  fechaEntrega: Date;
  tipoEntrega: string;
}

export interface EntregaCreateParams {
  scoutId: string;
  fechaEntrega: Date;
  tipoEntrega: string;
}
