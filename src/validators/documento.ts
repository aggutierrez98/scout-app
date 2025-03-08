import { z } from "zod";
import { IdSchema } from "./scout";
import { VALID_TIPOS_EVENTO } from "utils/constants";

export const numberReg = /^[0-9]/;
export const lettersReg = /^[a-zA-Z]/;
export const directionReg = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const nameRegex = /^[a-z ,.'-]+$/i;
export const nanoIdRegex = /^[\w-]+$/;

// export const fileSchema = z.object({
//   fieldname: z.string(),
//   originalname: z.string(),
//   mimetype: z.string().regex(/^image\/(png)$/), // Permitimos solo imágenes PNG
//   size: z.number().max(5 * 1024 * 200), // Max 200KB de tamaño
//   buffer: z.instanceof(Buffer),
// });

const blobSchema = z.object({
  _data: z.object({
    __collector: z.object({}).optional(),
    blobId: z.string(),
    lastModified: z.union([z.date(), z.undefined()]),
    offset: z.number().int(),
    size: z.number().max(5 * 1024 * 200), // Max 200KB de tamaño
    type: z.string().regex(/^image\/(png)$/), // Permitimos solo imágenes PNG
  })
});

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

export const FillDocumentoSchema = z.object({
  // // fechaPresentacion: z.coerce
  // //   .date({
  // //     errorMap: (issue, { defaultError }) => ({
  // //       message:
  // //         issue.code === "invalid_date"
  // //           ? "Debe ser una fecha valida"
  // //           : defaultError,
  // //     }),
  // //   })
  // //   .refine((date) => date < new Date(), {
  // //     message: "La fecha debe ser pasada",
  // //   }),
  scoutId: IdSchema.max(10),
  documentoId: IdSchema.max(10),
  familiarId: IdSchema.max(10).optional(),
  signature: z.string().optional(),
  cicloActividades: z.string().regex(numberReg).optional().default((new Date()).getFullYear().toString()),
  rangoDistanciaPermiso: z.string().optional().default("5 km"),
  aclaraciones: z.string().optional(),
  lugarEvento: z.string().optional(),
  fechaEventoComienzo: z.date().optional(),
  fechaEventoFin: z.date().optional(),
  tipoEvento: z.enum(VALID_TIPOS_EVENTO).optional(),
  retiraSolo: z.boolean().optional(),
  retiraPersonas: z.array(z.string()).optional()
})
