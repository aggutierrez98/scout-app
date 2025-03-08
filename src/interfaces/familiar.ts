import { Scout } from "./scout";

export interface Familiar {
  id: string;
  nombre: string;
  apellido: string;
  sexo: string;
  dni: string;
  fechaNacimiento: string;
  edad: string;
  localidad: string;
  direccion: string;
  mail?: string | null;
  telefono?: string | null;
  estadoCivil?: string;
}

export interface FamiliarWithRelacion extends Familiar {
  relacion: string;
}


export interface ScoutWithRelation extends Scout {
  relacion: string;
}

export interface FamiliarWithDetails extends Familiar {
  scoutFamiliares: ScoutWithRelation[];
}

export interface FamiliaresQueryParams {
  searchQuery: string;
}

export interface FamiliarEditParams {
  localidad: string;
  direccion: string;
  mail?: string;
  telefono?: string;
  estadoCivil?: string;
}

export interface FamiliarUnrelateParams {
  scoutId: string;
}
export interface FamiliarRelateParams {
  scoutId: string;
  relacion: string;
}
