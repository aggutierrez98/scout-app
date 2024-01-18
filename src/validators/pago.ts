import { z } from "zod";
import { IdSchema, numberReg } from "./scout";
import { VALID_METODOS_PAGO } from "./constants";

export const EditPagoSchema = z.object({
  concepto: z.string({ required_error: "Campo requerido" }).max(50),
  monto: z
    .string({ required_error: "Campo requerido" })
    .regex(numberReg)
    .max(99999999),
  metodoPago: z.enum(VALID_METODOS_PAGO),
  fechaPago: z.date(),
});

export const CreatePagoSchema = z.object({
  concepto: z.string({ required_error: "Campo requerido" }).max(50),
  monto: z
    .string({ required_error: "Campo requerido" })
    .regex(numberReg)
    .max(99999999),
  metodoPago: z.enum(VALID_METODOS_PAGO, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: `Ingresar alguno de los valores ${VALID_METODOS_PAGO},`,
          };
        case "invalid_enum_value":
          return {
            message: `Ingresar alguno de los valores ${VALID_METODOS_PAGO},`,
          };
        default:
          return { message: "Valor invalido" };
      }
    },
  }),
  fechaPago: z.coerce
    .date({ required_error: "La fecha es requerida" })
    .refine((date) => date < new Date(), {
      message: "La fecha debe ser pasada",
    }),
  scoutId: IdSchema.max(10),
});
