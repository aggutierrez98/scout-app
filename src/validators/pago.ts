import { z } from "zod";
import { IdSchema, numberReg } from "./scout";
import { VALID_METODOS_PAGO } from "./constants";

export const EditPagoSchema = z.object({
  concepto: z.string().max(50),
  monto: z.string().regex(numberReg).max(99999999),
  metodoPago: z.enum(VALID_METODOS_PAGO),
  fechaPago: z.date(),
});
