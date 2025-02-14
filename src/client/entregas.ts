import * as SecureStore from "expo-secure-store";
import {
  Entrega,
  EntregaCreateParams,
  EntregaEditParams,
  EntregasQueryParams,
} from "interfaces/entrega";
import { getArrSearchParam } from "utils/getArraySearchParam";
import api from "./api";
import { ENTREGAS_QUERY_LIMIT } from "utils/constants";

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

export const createEntrega = async (entregaData: EntregaCreateParams) => {
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

export const editEntrega = async (
  entregaId: string,
  entregaData: EntregaEditParams
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

export const fetchEntregas = async (
  pageParam: number,
  {
    searchQuery,
    tipoEntregasSelected,
    tiempoDesde,
    tiempoHasta,
    funciones,
    ramas,
    equipos,
    progresiones,
  }: EntregasQueryParams
) => {
  try {
    const offset = (pageParam - 1) * ENTREGAS_QUERY_LIMIT;

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
    const tipoEntregasStr = getArrSearchParam(
      tipoEntregasSelected,
      "tipoEntrega"
    );

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/entrega?offset=${offset}&limit=${ENTREGAS_QUERY_LIMIT}&nombre=${searchQuery}${equiposStr}${progresionesStr}${funcionesStr}${ramasStr}${tipoEntregasStr}&tiempoDesde=${tiempoDesde.toISOString()}&tiempoHasta=${tiempoHasta.toISOString()}`,
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
