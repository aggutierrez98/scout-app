import * as SecureStore from "expo-secure-store";
import { LoginResponse } from "interfaces/scout";
import {
  User,
  UserCreateParams,
  UserModifyParams,
  UsersQueryParams,
} from "interfaces/auth";
import { USERS_QUERY_LIMIT, VALID_ROLES } from "utils/constants";
import api from "./api";

export const fetchUsers = async (
  pageParam: number,
  { searchQuery }: UsersQueryParams
) => {
  try {
    const offset = (pageParam - 1) * USERS_QUERY_LIMIT;

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/auth/users?offset=${offset}&limit=${USERS_QUERY_LIMIT}&nombre=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as User[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchUser = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    // // const json = await scoutsApi.get("scout").json();
    const { data, status } = await api.get(`/auth/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (userData: UserCreateParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data } = await api.put("/auth/create", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const modifyUser = async (id: string, userData: UserModifyParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data } = await api.put(`/auth/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUser = async (userData: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/auth", userData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};

export const renewLogin = async () => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    if (token) {
      const data = await api.get("/auth/renew", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data as LoginResponse;
    }
    return null;
  } catch (error) {
    await SecureStore.deleteItemAsync("secure_token");
    return null;
  }
};
