import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
const QUERY_LIMIT = 20;
import { API_URL } from "@env";
import axios from "axios";
import { Familiar, FamiliarWithDetails } from "types/interfaces/familiar";

interface QueryParams {
  searchQuery: string;
}

export interface EditFamiliarParams {
  // nombre: string;
  // apellido: string;
  // sexo: string;
  // dni: string;
  // fechaNacimiento: Date;
  localidad: string;
  direccion: string;
  mail?: string;
  telefono?: string;
  estadoCivil?: string;
}

// interface CreateParams {
//   scoutId: string;
//   documentoId: string;
//   fechaPresentacion: Date;
// }

export interface UnrelateFamiliarParams {
  scoutId: string;
}
export interface RelateFamiliarParams {
  scoutId: string;
  relacion: string;
}

export const fetchFamiliar = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.get(`${API_URL}/familiar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as FamiliarWithDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editFamiliar = async (
  familiarId: string,
  familiarData: EditFamiliarParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.put(
      `${API_URL}/familiar/${familiarId}`,
      familiarData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Familiar;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useEditFamiliar = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditFamiliarParams }) =>
      editFamiliar(id, data),
    mutationKey: ["edit-familiar", "id"],
  });

export const fetchFamiliares = async (
  pageParam: number,
  { searchQuery }: QueryParams
) => {
  try {
    const offset = (pageParam - 1) * QUERY_LIMIT;
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.get(
      `${API_URL}/familiar?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useFamiliares = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "familiares",
      `searchParam${queryParams.searchQuery ?? ""}-searchQuery=${
        queryParams.searchQuery
      }`,
    ],
    queryFn: ({ pageParam }) => fetchFamiliares(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useFamiliar = (id: string) =>
  useQuery({
    queryKey: ["familiares", id],
    queryFn: () => fetchFamiliar(id),
  });

export const relateFamiliar = async (
  familiarId: string,
  familiarData: RelateFamiliarParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.put(
      `${API_URL}/familiar/relate/${familiarId}`,
      familiarData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Familiar;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const unrelateFamiliar = async (
  familiarId: string,
  familiarData: UnrelateFamiliarParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.put(
      `${API_URL}/familiar/unrelate/${familiarId}`,
      familiarData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Familiar;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useRelateFamiliar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      familiarId,
      data,
    }: {
      familiarId: string;
      data: RelateFamiliarParams;
    }) => relateFamiliar(familiarId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["familiares", variables.familiarId], data);
    },
  });
};

export const useUnrelateFamiliar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      familiarId,
      data,
    }: {
      familiarId: string;
      data: UnrelateFamiliarParams;
    }) => unrelateFamiliar(familiarId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["familiares", variables.familiarId], data);
    },
  });
};
