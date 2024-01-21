import { z } from "zod";
import { IdSchema } from "./scout";
import { VALID_ENTREGAS_TYPE } from "utils/constants";

export const EditEntregaSchema = z.object({
  scoutId: IdSchema.max(10),
  tipoEntrega: z.enum(VALID_ENTREGAS_TYPE),
  fechaEntrega: z.date({ required_error: "La fecha es requerida" }),
});

export const CreateEntregaSchema = z.object({
  scoutId: IdSchema.max(10),
  tipoEntrega: z.enum(VALID_ENTREGAS_TYPE, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: `Ingresar alguno de los valores ${VALID_ENTREGAS_TYPE},`,
          };
        case "invalid_enum_value":
          return {
            message: `Ingresar alguno de los valores ${VALID_ENTREGAS_TYPE},`,
          };
        default:
          return { message: "Valor invalido" };
      }
    },
  }),
  fechaEntrega: z.date({ required_error: "La fecha es requerida" }),
});
