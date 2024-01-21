export const VALID_RELIGIONS = [
  "CATOLICA",
  "JUDIA",
  "BUDISTA",
  "EVANGELICA",
] as const;
export const VALID_ESTADO_CIVIL = ["CASADO", "SOLTERO", "SEPARADO"] as const;
export const VALID_FUNCTIONS = ["JOVEN", "EDUCADOR", "COLABORADOR"] as const;

export const VALID_GET_SCOUTS_FILTERS = [
  "apellido",
  "dni",
  "fechaNacimiento",
] as const;

export const VALID_PROGRESSIONS = [
  "INTERRAMA",
  "PISTA",
  "RUMBO",
  "TRAVESIA",
] as const;

export const VALID_RELATIONSHIPS = [
  "PADRE",
  "MADRE",
  "TIO",
  "TIA",
  "HERMANO",
  "HERMANA",
  "OTRO",
] as const;

export const M_RELATIONSHIPS = ["PADRE", "TIO", "HERMANO", "OTRO"] as const;
export const F_RELATIONSHIPS = ["MADRE", "TIA", "HERMANA", "OTRO"] as const;

export const VALID_ENTREGAS_TYPE = [
  "UNIFORME",
  "GUIA",
  "SUBGUIA",
  "PROGPISTA",
  "PROGRUMBO",
  "PROGTRAVESIA",
  "PROMESA",
  "ESPNATURALEZA",
  "ESPARTE",
  "ESPSERVICIO",
  "ESPESPIRITUALIDAD",
  "ESPDEPORTES",
  "ESPCIENCIA",
  "SUPERACION",
] as const;

export const VALID_SEX = ["M", "F"] as const;

export const VALID_METODOS_PAGO = [
  "EFECTIVO",
  "TRANSFERENCIA",
  "OTRO",
] as const;

export const VALID_ROLES = [
  "ADMIN",
  "JEFE",
  "EDUCADOR",
  "COLABORADOR",
  "EXTERNO",
] as const;
