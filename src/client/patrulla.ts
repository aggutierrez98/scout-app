import { Patrulla } from "interfaces/scout";
import * as SecureStore from "expo-secure-store";
import api from "./api";

export const fetchPatrullas = async () => {
  try {
    const token = await SecureStore.getItemAsync("secure_token");

    const { data, status } = await api.get("/patrulla", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Patrulla[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
