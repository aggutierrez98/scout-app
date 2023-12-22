import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { getArrSearchParam } from "utils/getArraySearchParam";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
const QUERY_LIMIT = 15;
import { API_URL } from "@env";
import { Pago } from "types/interfaces/pago";

interface QueryParams {
  metodoPago: string;
  searchQuery: string;
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
  tiempoDesde: Date;
  tiempoHasta: Date;
}

export interface EditPagoParams {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
  rendido: string;
}

export const fetchPagos = async (
  pageParam: number,
  {
    patrullas,
    progresiones,
    funciones,
    searchQuery,
    metodoPago,
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

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.get(
      `${API_URL}/pago?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}&concepto=${searchQuery}&metodoPago=${metodoPago}${progresionesStr}${patrullasStr}${funcionesStr}`,
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
    const { data, status } = await axios.get(`${API_URL}/pago/${id}`, {
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

export const editPago = async (pagoId: string, pagoData: EditPagoParams) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await axios.put(
      `${API_URL}/pago/${pagoId}`,
      pagoData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data as Pago;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const usePagos = (queryParams: QueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "pagos",
      `searchParam${queryParams.searchQuery ?? ""}-patrullas=${
        queryParams.patrullas
      }-metodoPago=${queryParams.metodoPago}-progresion=${
        queryParams.progresiones
      }-funcion=${queryParams.funciones}`,
    ],
    queryFn: ({ pageParam }) => fetchPagos(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const usePago = (id: string) =>
  useQuery({ queryKey: ["pago", "id"], queryFn: () => fetchPago(id) });

export const useEditPago = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditPagoParams }) =>
      editPago(id, data),
    mutationKey: ["pago", "id"],
  });
