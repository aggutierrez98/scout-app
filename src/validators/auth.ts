import { z } from "zod";
import { VALID_ROLES } from "utils/constants";
import { IdSchema, lettersReg } from "./scout";

const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,12}$/;

export const EditUserSchema = z.object({
  active: z.boolean(),
  role: z.enum(VALID_ROLES),
});

export const CreateUserSchema = z.object({
  role: z.enum(VALID_ROLES, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: `Ingresar alguno de los valores ${VALID_ROLES},`,
          };
        case "invalid_enum_value":
          return {
            message: `Ingresar alguno de los valores ${VALID_ROLES},`,
          };
        default:
          return { message: "Valor invalido" };
      }
    },
  }),
  scoutId: IdSchema.max(10).optional(),
  familiarId: IdSchema.max(10).optional(),
  username: z
    .string({ required_error: "Nombre de usuario requerido" })
    .min(8, "Debe tener al menos 8 caracteres")
    .max(20, "Debe tener como maximo 20 caracteres")
    .regex(lettersReg, "Debe contener solo letras"),

}).superRefine((args, ctx) => {
  if (args.familiarId && args.scoutId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["familiarId"],
      fatal: true,
      message: "Seleccionar solamente scout o familiar (NO ambas).",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["scoutId"],
      fatal: true,
      message: "Seleccionar solamente scout o familiar (NO ambas).",
    });
  }
  if (!args.familiarId && !args.scoutId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["familiarId"],
      fatal: true,
      message: "Debe seleccionar un scout/familiar asociado",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["scoutId"],
      fatal: true,
      message: "Debe seleccionar un scout/familiar asociado",
    });
  }
});

export const LoginUserSchema = z.object({
  username: z
    .string({ required_error: "Nombre de usuario requerido" })
    .min(8, "Debe tener al menos 8 caracteres")
    .max(20, "Debe tener como maximo 20 caracteres")
    .regex(lettersReg, "Debe contener solo letras"),
  password: z.string({ required_error: "Contraseña requerida" })
});

export const FirstLoginUserSchema = z.object({
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
  passwordConfirm: z
    .string({ required_error: "Confirmacion de contraseña requerida" })
    .regex(
      passRegex,
      "Debe contener letras en mayuscula, miniscula, numeros y entre 8 y 12 caracteres"
    )
}).superRefine((args, ctx) => {
  if (args.passwordConfirm !== args.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      fatal: true,
      message: "Las contraseñas deben coincidir",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordConfirm"],
      fatal: true,
      message: "Las contraseñas deben coincidir",
    });
  }
});
