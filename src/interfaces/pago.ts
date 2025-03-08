export interface Pago {
  id: string;
  concepto: string;
  monto: number;
  rendido: boolean;
  metodoPago: string;
  scoutId: string;
  fechaPago: string;
  fechaCreacion: string;
  scout: Scout;
}

export interface Scout {
  nombre: string;
  apellido: string;
  dni: string;
  funcion: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
}

export interface PagosQueryParams {
  metodoPago: string;
  scoutId?: string
  searchQuery: string;
  equipos: string[];
  progresiones: string[];
  ramas: string[];
  funciones: string[];
  rendido: "si" | "no" | "";
  tiempoDesde?: Date;
  tiempoHasta?: Date;
}

export interface PagoCreateParams {
  concepto: string;
  monto: number;
  metodoPago: string;
  scoutId: string;
  fechaPago: Date;
}

export interface PagoEditParams {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: number;
  rendido: boolean;
}
