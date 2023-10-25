import { z } from "zod";
import { VALID_ROLES } from "./constants";

export const EditUserSchema = z.object({
  active: z.boolean(),
  role: z.enum(VALID_ROLES),
});
