export interface Documento {
  id: string;
  scout: {
    nombre: string;
    apellido: string;
  };
  documento: {
    nombre: string;
    vence: boolean;
  };
  scoutId: string;
  fechaPresentacion: string;
  fechaCreacion: string;
}

export interface DocumentoData {
  id: string;
  nombre: string;
  vence: boolean;
}

export interface DocumentosQueryParams {
  searchQuery: string;
  equipos: string[];
  progresiones: string[];
  ramas: string[];
  funciones: string[];
  vence: string;
  tiempoDesde: Date;
  tiempoHasta: Date;
}

export interface DocumentoEditParams {
  fechaPresentacion: Date;
}

export interface DocumentoCreateParams {
  scoutId: string;
  documentoId: string;
  fechaPresentacion: Date;
}
