import { z } from "zod";
import { IdSchema, lettersReg, numberReg } from "./scout";
import { VALID_ESTADO_CIVIL, VALID_RELATIONSHIPS } from "utils/constants";

export const EditFamiliarSchema = z.object({
  localidad: z
    .string({ required_error: "Campo requerido" })
    .max(100)
    .regex(lettersReg),
  direccion: z.string({ required_error: "Campo requerido" }).max(100),
  estadoCivil: z.enum(VALID_ESTADO_CIVIL, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: `Ingresar alguno de los valores ${VALID_ESTADO_CIVIL},`,
          };
        case "invalid_enum_value":
          return {
            message: `Ingresar alguno de los valores ${VALID_ESTADO_CIVIL},`,
          };
        default:
          return { message: "Valor invalido" };
      }
    },
  }),
  telefono: z.union([
    z.string().min(8).max(15).regex(numberReg).optional(),
    z.literal(""),
  ]),
  mail: z.union([z.string().email(), z.literal("")]),
});

export const RelateFamiliarSchema = z.object({
  scoutId: IdSchema.max(10),
  relacion: z.enum(VALID_RELATIONSHIPS, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: `Ingresar alguno de los valores ${VALID_RELATIONSHIPS},`,
          };
        case "invalid_enum_value":
          return {
            message: `Ingresar alguno de los valores ${VALID_RELATIONSHIPS},`,
          };
        default:
          return { message: "Valor invalido" };
      }
    },
  }),
});
