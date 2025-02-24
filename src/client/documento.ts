import * as SecureStore from "expo-secure-store";
import { getArrSearchParam } from "utils/getArraySearchParam";
import {
  Documento,
  DocumentoCreateParams,
  DocumentoData,
  DocumentoDowmloadData,
  DocumentoEditParams,
  DocumentosQueryParams,
} from "interfaces/documento";
import { DOCUMENTOS_QUERY_LIMIT } from "utils/constants";
import api from "./api";

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
  documentoData: DocumentoEditParams
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

export const fetchDocuments = async (
  pageParam: number,
  {
    equipos,
    progresiones,
    funciones,
    ramas,
    searchQuery,
    vence,
    tiempoDesde,
    tiempoHasta,
  }: DocumentosQueryParams
) => {
  try {
    const offset = (pageParam - 1) * DOCUMENTOS_QUERY_LIMIT;

    let funcionesToSend: string[] = funciones;
    if (funcionesToSend.includes("EDUCADOR")) {
      funcionesToSend = funcionesToSend.filter(
        (funcion) => funcion !== "EDUCADOR"
      );
      funcionesToSend.push("JEFE");
      funcionesToSend.push("SUBJEFE");
      funcionesToSend.push("AYUDANTE");
    }

    const equiposStr = getArrSearchParam(equipos, "equipos");
    const progresionesStr = getArrSearchParam(progresiones, "progresiones");
    const ramasStr = getArrSearchParam(ramas, "ramas");
    const funcionesStr = getArrSearchParam(funcionesToSend, "funciones");
    const venceStr = vence ? `&vence=${vence === "si" ? "true" : "false"}` : "";

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/documento?offset=${offset}&limit=${DOCUMENTOS_QUERY_LIMIT}&nombre=${searchQuery}${progresionesStr}${equiposStr}${funcionesStr}${ramasStr}${venceStr}&tiempoDesde=${tiempoDesde.toISOString()}&tiempoHasta=${tiempoHasta.toISOString()}`,
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

export const createDocumento = async (documentoData: DocumentoCreateParams) => {
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

export const getDocumentUrl = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(`/documento/${id}?download=true`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data as DocumentoDowmloadData;
  } catch (error) {
    console.log(error);
    return null;
  }
}