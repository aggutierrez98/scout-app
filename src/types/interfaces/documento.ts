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
