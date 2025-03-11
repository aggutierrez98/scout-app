import * as SecureStore from "expo-secure-store";
import { getArrSearchParam } from "utils/getArraySearchParam";
import {
  Documento,
  DocumentoCreateParams,
  DocumentoData,
  DocumentoDowmloadData,
  DocumentoEditParams,
  DocumentoFillParams,
  DocumentoSignParams,
  DocumentosQueryParams,
  DocumentoUploadParams,
  FillResponse,
} from "interfaces/documento";
import { DOCUMENTOS_QUERY_LIMIT } from "utils/constants";
import api from "./api";
import { isAxiosError } from "axios";
import * as FileSystem from "expo-file-system";

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
    scoutId,
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

    // TODO: Cambiar el filtro de funciones
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
    const scoutIdStr = scoutId ? `&scoutId=${scoutId}` : ""
    const tiempoDesdeStr = tiempoDesde ? `&tiempoDesde=${tiempoDesde.toISOString()}` : ""
    const tiempoHastaStr = tiempoHasta ? `&tiempoHasta=${tiempoHasta.toISOString()}` : ""
    const tiempoStr = `${tiempoDesdeStr}${tiempoHastaStr}`

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/documento?offset=${offset}&limit=${DOCUMENTOS_QUERY_LIMIT}&nombre=${searchQuery}${scoutIdStr}${progresionesStr}${equiposStr}${funcionesStr}${ramasStr}${venceStr}${tiempoStr}`,
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

export const fillDocumento = async (documentoData: DocumentoFillParams) => {
  const token = await SecureStore.getItemAsync("secure_token");

  const formData = new FormData();
  formData.append("documentoId", documentoData.documentoId);
  if (documentoData.scoutId) formData.append("scoutId", documentoData.scoutId);
  if (documentoData.familiarId) formData.append("familiarId", documentoData.familiarId);
  if (documentoData.lugarEvento) formData.append("lugarEvento", documentoData.lugarEvento);
  if (documentoData.tipoEvento) formData.append("tipoEvento", documentoData.tipoEvento);
  if (documentoData.fechaEventoComienzo) formData.append("fechaEventoComienzo", documentoData.fechaEventoComienzo?.toISOString() || "");
  if (documentoData.fechaEventoFin) formData.append("fechaEventoFin", documentoData.fechaEventoFin?.toISOString() || "");
  if (documentoData.aclaraciones) formData.append("aclaraciones", documentoData.aclaraciones || "");
  if (documentoData.signature && documentoData.theme) {
    formData.append("signature", {
      uri: documentoData.signature,
      name: "signature.png",
      type: "image/png",
    } as any);
    formData.append("theme", documentoData.theme);
  }
  formData.append(
    "retiroData", JSON.stringify({
      solo: documentoData.retiraSolo,
      personas: documentoData.retiraPersonas
    })
  );

  const { data } = await api.post(`/documento/fill`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data as FillResponse;
}

export const signDocumento = async (documentoData: DocumentoSignParams) => {
  const token = await SecureStore.getItemAsync("secure_token");
  const formData = new FormData();
  formData.append("documentoId", documentoData.documentoId);
  if (documentoData.signature && documentoData.theme) {
    formData.append("signature", {
      uri: documentoData.signature,
      name: "signature.png",
      type: "image/png",
    } as any);
    formData.append("theme", documentoData.theme);
  }

  if (documentoData.documentoFilled) {
    const fileUri = `${FileSystem.cacheDirectory}temp.pdf`
    await FileSystem.writeAsStringAsync(fileUri, documentoData.documentoFilled, { encoding: FileSystem.EncodingType.Base64 });
    formData.append("documentoFilled", {
      uri: fileUri,
      name: "document.pdf",
      type: "application/pdf",
    } as any);
  }

  const { data } = await api.post(`/documento/sign`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data as FillResponse;
}

export const uploadDocumento = async (documentoData: DocumentoUploadParams) => {
  const token = await SecureStore.getItemAsync("secure_token");

  const formData = new FormData();
  formData.append("documentoId", documentoData.documentoId);
  formData.append("scoutId", documentoData.scoutId);
  const fileUri = `${FileSystem.cacheDirectory}temp.pdf`
  await FileSystem.writeAsStringAsync(fileUri, documentoData.documentoFilled, { encoding: FileSystem.EncodingType.Base64 });
  formData.append("documentoFilled", {
    uri: fileUri,
    name: "document.pdf",
    type: "application/pdf",
  } as any);

  const { data } = await api.post(`/documento/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data as Documento;
}