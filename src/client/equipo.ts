import { Equipo } from "interfaces/scout";
import * as SecureStore from "expo-secure-store";
import api from "./api";

export const fetchEquipos = async () => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get("/equipo", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data as Equipo[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
