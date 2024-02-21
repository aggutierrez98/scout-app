import { z } from "zod";
import { IdSchema } from "./scout";

export const numberReg = /^[0-9]/;
export const lettersReg = /^[a-zA-Z]/;
export const directionReg = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const nameRegex = /^[a-z ,.'-]+$/i;
export const nanoIdRegex = /^[\w-]+$/;

export const EditDocumentoSchema = z.object({
  fechaPresentacion: z.date(),
});

export const CreateDocumentoSchema = z.object({
  fechaPresentacion: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Debe ser una fecha valida"
            : defaultError,
      }),
    })
    .refine((date) => date < new Date(), {
      message: "La fecha debe ser pasada",
    }),
  scoutId: IdSchema.max(10),
  documentoId: IdSchema.max(10),
});
