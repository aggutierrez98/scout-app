import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
const QUERY_LIMIT = 20;
import { getArrSearchParam } from "utils/getArraySearchParam";
import { Documento, DocumentoData } from "types/interfaces/documento";
import api from "./api";

interface QueryParams {
  searchQuery: string;
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
  vence: string;
  tiempoDesde: Date;
  tiempoHasta: Date;
}

export interface EditDocumentoParams {
  fechaPresentacion: Date;
}

interface CreateParams {
  scoutId: string;
  documentoId: string;
  fechaPresentacion: Date;
}

export const fetchDocumento = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(`/documento/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Documento;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editDocumento = async (
  documentoId: string,
  documentoData: EditDocumentoParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.put(
      `/documento/${documentoId}`,
      documentoData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Documento;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useEditDocumento = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditDocumentoParams }) =>
      editDocumento(id, data),
    mutationKey: ["documentos", "id"],
  });

export const fetchDocuments = async (
  pageParam: number,
  {
    patrullas,
    progresiones,
    funciones,
    searchQuery,
    vence,
    tiempoDesde,
    tiempoHasta,
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
    const venceStr = vence ? `&vence=${vence === "si" ? "true" : "false"}` : "";

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/documento?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}${progresionesStr}${patrullasStr}${funcionesStr}${venceStr}&tiempoDesde=${tiempoDesde.toISOString()}&tiempoHasta=${tiempoHasta.toISOString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return (data as Documento[]).map((documento) => ({
      ...documento,
      fechaPresentacion: new Date(
        documento.fechaPresentacion
      ).toLocaleDateString("es"),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchDocumentsData = async () => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get("/documento/data", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as DocumentoData[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useDocuments = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "documents",
      `searchParam${queryParams.searchQuery ?? ""}-patrullas=${
        queryParams.patrullas
      }-progresion=${queryParams.progresiones}-funcion=${
        queryParams.funciones
      }-funcion=${queryParams.funciones}-vence=${
        queryParams.vence
      }-tiempoDesde=${queryParams.tiempoDesde}-tiempoHasta=${
        queryParams.tiempoHasta
      }`,
    ],
    queryFn: ({ pageParam }) => fetchDocuments(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });
export const useDocumentsData = () =>
  useQuery({
    queryKey: ["documents-data"],
    queryFn: () => fetchDocumentsData(),
  });

export const useDocumento = (id: string) =>
  useQuery({
    queryKey: ["documento", "id"],
    queryFn: () => fetchDocumento(id),
  });

export const deleteDocumento = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");
    const { data } = await api.delete(`/documento/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Documento;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useDeleteDocumento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDocumento(id),
    mutationKey: ["delete-documento", "id"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
  });
};

export const createDocumento = async (documentoData: CreateParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data } = await api.post("/documento", documentoData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Documento;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useCreateDocumento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateParams) => createDocumento(data),
    mutationKey: ["documentos"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
  });
};
