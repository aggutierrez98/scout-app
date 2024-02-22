import { AxiosError } from "axios";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { LoginResponse } from "interfaces/scout";
import { UseFormSetError } from "react-hook-form";
import { User } from "interfaces/auth";
import { VALID_ROLES } from "utils/constants";
import api from "./api";
const QUERY_LIMIT = 15;

interface ApiError {
  message: string;
  name: string;
}

interface QueryParams {
  searchQuery?: string;
}

interface ModifyParams {
  active: boolean;
  role: typeof VALID_ROLES;
}

interface CreateParams {
  username: string;
  password: string;
  scoutId: string;
  // role: typeof VALID_ROLES
}

export const fetchUsers = async (
  pageParam: number,
  { searchQuery }: QueryParams
) => {
  try {
    const offset = (pageParam - 1) * QUERY_LIMIT;

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/auth/users?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}`,
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

export const createUser = async (userData: CreateParams) => {
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
export const modifyUser = async (id: string, userData: ModifyParams) => {
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

export const useRenewLogin = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: renewLogin,
    retry: false,
    throwOnError(error, query) {
      const queryClient = useQueryClient();
      queryClient.resetQueries();
      return false;
    },
  });

export const useLogin = (
  setError: UseFormSetError<{
    username: string;
    password: string;
  }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async ({ token, ...data }: LoginResponse) => {
      // localStorage.setItem("token", data.data.token);
      // localStorage.setItem("token-init-date", new Date().getTime());
      await SecureStore.setItemAsync("secure_token", token);

      queryClient.setQueryData(["user"], () => {
        return {
          id: data.id,
          username: data.username,
          name: `${data.scout.apellido} ${data.scout.nombre}`,
          rol: data.role,
          funcion: data.scout.funcion,
          dni: data.scout.dni,
          sexo: data.scout.sexo,
          telefono: data.scout.telefono,
          mail: data.scout.mail,
        };
      });
    },

    onError: (data: AxiosError) => {
      // console.log(data.message);

      if (data.response) {
        // const message = (data.response.data as ApiError).message;
        setError("username", {
          type: "credentials",
          message: "Credenciales invalidas",
        });
        setError("password", {
          type: "credentials",
          message: "Credenciales invalidas",
        });
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = async () => {
    await SecureStore.deleteItemAsync("secure_token");
    queryClient.resetQueries();
  };

  return logout;
};

export const useUsers = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: ["users", `searchParam${queryParams.searchQuery ?? ""}`],
    queryFn: ({ pageParam }) => fetchUsers(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useUser = (id: string) =>
  useQuery({ queryKey: ["users", "id"], queryFn: () => fetchUser(id) });

export const useModifyUser = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: ModifyParams }) =>
      modifyUser(id, data),
    mutationKey: ["users", "id"],
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: (data: CreateParams) => createUser(data),
    mutationKey: ["users", "id"],
  });
