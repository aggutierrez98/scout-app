import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Scout } from "types/interfaces/scout";
import { getArrSearchParam } from "utils/getArraySearchParam";
import * as SecureStore from "expo-secure-store";
import api from "./api";
const QUERY_LIMIT = 15;

interface QueryParams {
  sexo: string;
  searchQuery: string;
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
}

export interface EditScoutParams {
  funcion: string;
  religion: string;
  direccion: string;
  localidad: string;
  progresion?: string;
  patrullaId?: string;
  telefono?: string;
  email?: string;
}

export const fetchScouts = async (
  pageParam: number,
  { patrullas, progresiones, funciones, searchQuery, sexo }: QueryParams
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

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/scout?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}&sexo=${sexo}${progresionesStr}${patrullasStr}${funcionesStr}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Scout[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchScout = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    // // const json = await scoutsApi.get("scout").json();
    const { data, status } = await api.get(`/scout/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Scout;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useScouts = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "scouts",
      `searchParam${queryParams.searchQuery ?? ""}-patrullas=${
        queryParams.patrullas
      }-sexo=${queryParams.sexo}-progresion=${
        queryParams.progresiones
      }-funcion=${queryParams.funciones}`,
    ],
    queryFn: ({ pageParam }) => fetchScouts(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useScout = (id: string) =>
  useQuery({ queryKey: ["scout", "id"], queryFn: () => fetchScout(id) });

export const fetchAllScouts = async (onlyEducadores?: boolean) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    // // const json = await scoutsApi.get("scout").json();
    const { data } = await api.get(
      `/scout/all${onlyEducadores ? "Educadores" : "Scouts"}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as {
      id: string;
      nombre: string;
    }[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editScout = async (
  scoutId: string,
  scoutData: EditScoutParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    // // const json = await scoutsApi.get("scout").json();
    const { data, status } = await api.put(`/scout/${scoutId}`, scoutData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Scout;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useAllScouts = (onlyEducadores?: boolean) =>
  useQuery({
    queryKey: ["scouts", "all"],
    queryFn: () => fetchAllScouts(onlyEducadores),
  });

export const useEditScout = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditScoutParams }) =>
      editScout(id, data),
    mutationKey: ["users", "id"],
  });
