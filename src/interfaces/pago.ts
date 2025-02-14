export interface Pago {
  id: string;
  concepto: string;
  monto: string;
  rendido: boolean;
  // metodoPago: typeof VALID_METODOS_PAGO;
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
  searchQuery: string;
  equipos: string[];
  progresiones: string[];
  funciones: string[];
  rendido: "si" | "no" | "";
  tiempoDesde: Date;
  tiempoHasta: Date;
}

export interface PagoCreateParams {
  concepto: string;
  monto: string;
  metodoPago: string;
  scoutId: string;
  fechaPago: Date;
}

export interface PagoEditParams {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
  rendido: boolean;
}
