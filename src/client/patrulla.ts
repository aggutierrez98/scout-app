import { useQuery } from "react-query";
// import ky from "ky";
import axios from "axios";
import { API_URL } from "@env";
import { Patrulla } from "types/interfaces/scout";

// export const scoutsApi = ky.create({
//   prefixUrl: API_URL,
// });

export const fetchPatrullas = async (pageParam = 1) => {
  try {
    const { data, status } = await axios.get(`${API_URL}/patrulla`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return data as Patrulla[];
  } catch (error) {
    console.log(error);
  }
};

export const usePatrullas = () => useQuery("patrullas", () => fetchPatrullas());
