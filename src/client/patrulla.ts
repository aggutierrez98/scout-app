import { useQuery } from "@tanstack/react-query";
// import ky from "ky";
import { API_URL } from "@env";
import { Patrulla } from "types/interfaces/scout";
import * as SecureStore from "expo-secure-store";
import api from "./api";
// export const scoutsApi = ky.create({
//   prefixUrl: API_URL,
// });

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

export const usePatrullas = () =>
  useQuery({ queryKey: ["patrullas"], queryFn: fetchPatrullas });
