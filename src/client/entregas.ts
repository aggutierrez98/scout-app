import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
const QUERY_LIMIT = 20;
import { Entrega } from "types/interfaces/entrega";
import { getArrSearchParam } from "utils/getArraySearchParam";
import api from "./api";

interface QueryParams {
  searchQuery: string;
  tiempoDesde: Date;
  tiempoHasta: Date;
  tipoEntregasSelected: string[];
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
}

export interface EditEntregaParams {
  scoutId: string;
  fechaEntrega: Date;
  tipoEntrega: string;
}

export interface CreateParams {
  scoutId: string;
  fechaEntrega: Date;
  tipoEntrega: string;
}

// export interface UnrelateFamiliarParams {
//   scoutId: string;
// }
// export interface RelateFamiliarParams {
//   scoutId: string;
//   relacion: string;
// }

export const fetchEntrega = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(`/entrega/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Entrega;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createEntrega = async (entregaData: CreateParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data } = await api.post("/entrega", entregaData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Entrega;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useCreateEntrega = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateParams) => createEntrega(data),
    mutationKey: ["entregas"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entregas"] });
    },
  });
};

export const editEntrega = async (
  entregaId: string,
  entregaData: EditEntregaParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.put(
      `/entrega/${entregaId}`,
      entregaData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Entrega;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useEditEntrega = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditEntregaParams }) =>
      editEntrega(id, data),
    mutationKey: ["edit-entrega", "id"],
  });

export const fetchEntregas = async (
  pageParam: number,
  {
    searchQuery,
    tipoEntregasSelected,
    tiempoDesde,
    tiempoHasta,
    funciones,
    patrullas,
    progresiones,
  }: QueryParams
) => {
  try {
    const offset = (pageParam - 1) * QUERY_LIMIT;

    let funcionesToSend: string[] = funciones;
    if (funcionesToSend.includes("EDUCADOR")) {
      funcionesToSend = funcionesToSend.filter(
        (funcion) => funcion !== "EDUCADOR"
      );
      funcionesToSend.push("JEFE");
      funcionesToSend.push("SUBJEFE");
      funcionesToSend.push("AYUDANTE");
    }

    const patrullasStr = getArrSearchParam(patrullas, "patrullas");
    const progresionesStr = getArrSearchParam(progresiones, "progresiones");
    const funcionesStr = getArrSearchParam(funcionesToSend, "funciones");
    const tipoEntregasStr = getArrSearchParam(
      tipoEntregasSelected,
      "tipoEntrega"
    );

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/entrega?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}${patrullasStr}${progresionesStr}${funcionesStr}${tipoEntregasStr}&tiempoDesde=${tiempoDesde.toISOString()}&tiempoHasta=${tiempoHasta.toISOString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return (data as Entrega[]).map((entrega) => ({
      ...entrega,
      fechaEntrega: new Date(entrega.fechaEntrega).toLocaleDateString("es"),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useEntregas = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "entregas",
      `searchParam${queryParams.searchQuery ?? ""}-patrullas=${
        queryParams.patrullas
      }-progresion=${queryParams.progresiones}-funcion=${
        queryParams.funciones
      }-tipoEntrega=${queryParams.tipoEntregasSelected}-tiempoDesde=${
        queryParams.tiempoDesde
      }-tiempoHasta=${queryParams.tiempoHasta}`,
    ],
    queryFn: ({ pageParam }) => fetchEntregas(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useEntrega = (id: string) =>
  useQuery({
    queryKey: ["entregas", id],
    queryFn: () => fetchEntrega(id),
  });

export const deleteEntrega = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");
    const { data } = await api.delete(`/entrega/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Entrega;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useDeleteEntrega = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteEntrega(id),
    //   mutationKey: ["delete-entrega", "id"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entregas"] });
    },
  });
};
