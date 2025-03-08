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
  completable: boolean;
  fileUploadId?: string
  requiereFirma: boolean
  requiereFamiliar: boolean
}

export interface DocumentoDowmloadData {
  fileUrl: string
}

export interface DocumentosQueryParams {
  scoutId: string
  searchQuery: string;
  equipos: string[];
  progresiones: string[];
  ramas: string[];
  funciones: string[];
  vence: string;
  tiempoDesde?: Date;
  tiempoHasta?: Date;
}

export interface DocumentoEditParams {
  fechaPresentacion: Date;
}

export interface DocumentoCreateParams {
  scoutId: string;
  documentoId: string;
  fechaPresentacion?: Date;
  uploadId?: string
  // filled?: boolean
}

export interface DocumentoFillParams {
  scoutId: string;
  documentoId: string;
  familiarId?: string
  fechaPresentacion: Date;
  signature: string
  theme: "light" | "dark"
  cicloActividades?: string
  rangoDistanciaPermiso?: string
  lugarEvento?: string
  fechaEventoComienzo?: Date
  fechaEventoFin?: Date
  tipoEvento?: string
  retiraSolo?: boolean
  retiraPersonas?: string[]
  aclaraciones?: string
}

export interface UploadDocumentoResponse {
  data: {
    uploadId: string
  }
}
