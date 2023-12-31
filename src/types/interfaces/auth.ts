import { VALID_ROLES } from "validators/constants";
import { Scout } from "./scout";

export interface User {
  id: string;
  username: string;
  scout: Scout;
  role: typeof VALID_ROLES;
  active: boolean;
}
