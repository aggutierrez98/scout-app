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

export interface ScoutWithRelation extends Scout {
  relacion: string;
}

export interface FamiliarWithDetails extends Familiar {
  scoutFamiliares: ScoutWithRelation[];
}
