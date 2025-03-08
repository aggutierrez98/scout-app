import { VALID_ROLES } from "utils/constants";
import { Scout } from "./scout";
import { Familiar } from "./familiar";

export interface User {
  id: string;
  username: string;
  scout: Scout | null;
  familiar: Familiar | null;
  role: typeof VALID_ROLES;
  active: boolean;
}

export interface GetMeResponse {
  id: string
  username: string
  scout: Scout | null;
  familiar: Familiar | null;
  role: string
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

export interface Notification {
  message: string,
  id: string,
  read: boolean
}

export interface NotificationData {
  notifications: Notification[];
  unreadCount: any;
}