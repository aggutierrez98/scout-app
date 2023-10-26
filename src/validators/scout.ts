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
  religion: z.enum(VALID_RELIGIONS),
  funcion: z.enum(VALID_FUNCTIONS),
  patrullaId: z.union([IdSchema.max(10).optional(), z.literal("")]),
  telefono: z.union([
    z.string().min(8).max(15).regex(numberReg).optional(),
    z.literal(""),
  ]),
  mail: z.union([z.string().email(), z.literal("")]),
  progresionActual: z.union([
    z.enum(VALID_PROGRESSIONS).optional(),
    z.literal(""),
  ]),
});
