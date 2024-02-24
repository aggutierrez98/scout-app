import { VALID_ROLES } from "utils/constants";
import { Scout } from "./scout";

export interface User {
  id: string;
  username: string;
  scout: Scout;
  role: typeof VALID_ROLES;
  active: boolean;
}

export interface UsersQueryParams {
  searchQuery?: string;
}

export interface UserModifyParams {
  active: boolean;
  role: typeof VALID_ROLES;
}

export interface UserCreateParams {
  username: string;
  password: string;
  scoutId: string;
  // role: typeof VALID_ROLES
}
