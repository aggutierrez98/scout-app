import { z } from "zod";
import { VALID_ROLES } from "./constants";
import { IdSchema, lettersReg } from "./scout";

const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,12}$/;

export const EditUserSchema = z.object({
  active: z.boolean(),
  role: z.enum(VALID_ROLES),
});

export const CreateUserSchema = z.object({
  role: z.enum(VALID_ROLES),
  scoutId: IdSchema.max(10),
  username: z
    .string({ required_error: "Nombre de usuario requerido" })
    .min(8, "Debe tener al menos 8 caracteres")
    .max(20, "Debe tener como maximo 20 caracteres")
    .regex(lettersReg, "Debe contener solo letras"),
  password: z
    .string({ required_error: "Contraseña requerida" })
    .regex(
      passRegex,
      "Debe contener letras en mayuscula, miniscula, numeros y entre 8 y 12 caracteres"
    ),
});
