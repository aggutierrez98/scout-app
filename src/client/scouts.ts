import { Scout, ScoutEditParams, ScoutsQueryParams } from "interfaces/scout";
import { getArrSearchParam } from "utils/getArraySearchParam";
import * as SecureStore from "expo-secure-store";
import api from "./api";
import { SCOUTS_QUERY_LIMIT } from "utils/constants";

export const fetchScouts = async (
  pageParam: number,
  { equipos, progresiones, funciones, searchQuery, sexo, ramas }: ScoutsQueryParams
) => {
  try {
    const offset = (pageParam - 1) * SCOUTS_QUERY_LIMIT;

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

    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get(
      `/scout?offset=${offset}&limit=${SCOUTS_QUERY_LIMIT}&nombre=${searchQuery}&sexo=${sexo}${progresionesStr}${equiposStr}${funcionesStr}${ramasStr}`,
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

export const fetchAllScouts = async () => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");
    const { data } = await api.get(
      `/scout/?select=nombre,apellido,id,uuid&existingUser=false`,
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
      apellido: string
    }[];

  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editScout = async (
  scoutId: string,
  scoutData: ScoutEditParams
) => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

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
