import { getArrSearchParam } from "utils/getArraySearchParam";
import * as SecureStore from "expo-secure-store";
import {
  Pago,
  PagoCreateParams,
  PagoEditParams,
  PagosQueryParams,
} from "interfaces/pago";
import api from "./api";
import { PAGOS_QUERY_LIMIT } from "utils/constants";

export const fetchPagos = async (
  pageParam: number,
  {
    equipos,
    progresiones,
    ramas,
    funciones,
    searchQuery,
    metodoPago,
    rendido,
    tiempoDesde,
    tiempoHasta,
  }: PagosQueryParams
) => {
  try {
    const offset = (pageParam - 1) * PAGOS_QUERY_LIMIT;

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
    const ramasStr = getArrSearchParam(ramas, "ramas");
    const progresionesStr = getArrSearchParam(progresiones, "progresiones");
    const funcionesStr = getArrSearchParam(funcionesToSend, "funciones");
    const rendidoStr = rendido
      ? `&rendido=${rendido === "si" ? "true" : "false"}`
      : "";

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/pago?offset=${offset}&limit=${PAGOS_QUERY_LIMIT}&nombre=${searchQuery}&concepto=${searchQuery}&metodoPago=${metodoPago}${progresionesStr}${equiposStr}${funcionesStr}${ramasStr}${rendidoStr}&tiempoDesde=${tiempoDesde.toISOString()}&tiempoHasta=${tiempoHasta.toISOString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return (data as Pago[]).map((pago) => ({
      ...pago,
      fechaPago: new Date(pago.fechaPago).toLocaleDateString("es"),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchPago = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    // // const json = await scoutsApi.get("scout").json();
    const { data, status } = await api.get(`/pago/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Pago;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editPago = async (pagoId: string, pagoData: PagoEditParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");
    const { data, status } = await api.put(`/pago/${pagoId}`, pagoData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Pago;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPago = async (pagoData: PagoCreateParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data } = await api.post("/pago", pagoData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Pago;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deletePago = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");
    const { data } = await api.delete(`/pago/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Pago;
  } catch (error) {
    console.log(error);
    return null;
  }
};
