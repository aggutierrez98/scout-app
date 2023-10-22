import { z } from "zod";
import {
  VALID_FUNCTIONS,
  VALID_PROGRESSIONS,
  VALID_RELIGIONS,
} from "./constants";
export const numberReg = /^[0-9]/;
export const lettersReg = /^[a-zA-Z]/;
export const directionReg = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const nameRegex = /^[a-z ,.'-]+$/i;
export const nanoIdRegex = /^[\w-]+$/;

export const IdSchema = z.string().regex(nanoIdRegex);

export const EditScoutSchema = z.object({
  localidad: z.string().max(100).regex(lettersReg),
  direccion: z.string().max(100),
  telefono: z.string().min(10).max(15).regex(numberReg).optional(),
  mail: z.union([z.string().email(), z.literal("")]),
  religion: z.enum(VALID_RELIGIONS),
  patrulla: IdSchema.max(10),
  funcion: z.enum(VALID_FUNCTIONS),
  progresion: z.enum(VALID_PROGRESSIONS),
  // progresionActual: z.enum(VALID_PROGRESSIONS),
});
