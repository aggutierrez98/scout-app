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
