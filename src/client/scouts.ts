import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "@env";
import { Scout } from "types/interfaces/scout";
const QUERY_LIMIT = 15;
import { getArrSearchParam } from "utils/getArraySearchParam";

interface QueryParams {
  sexo: string;
  searchQuery: string;
  patrullas: string[];
  progresiones: string[];
  funciones: string[];
}

export const fetchScouts = async (
  pageParam = 1,
  { patrullas, progresiones, funciones, searchQuery, sexo }: QueryParams
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

    const { data, status } = await axios.get(
      `${API_URL}/scout?offset=${offset}&limit=${QUERY_LIMIT}&nombre=${searchQuery}&sexo=${sexo}${progresionesStr}${patrullasStr}${funcionesStr}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data as Scout[];
  } catch (error) {
    console.log(error);
  }
};

export const fetchScout = async (id: string) => {
  try {
    // // const json = await scoutsApi.get("scout").json();
    const { data, status } = await axios.get(`${API_URL}/scout/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return data as Scout;
  } catch (error) {
    console.log(error);
  }
};

export const useScouts = (queryParams: QueryParams) =>
  useInfiniteQuery(
    [
      "scouts",
      `searchParam${queryParams.searchQuery ?? ""}-patrullas=${
        queryParams.patrullas
      }-sexo=${queryParams.sexo}-progresion=${
        queryParams.progresiones
      }-funcion=${queryParams.funciones}`,
    ],
    ({ pageParam }) => fetchScouts(pageParam, queryParams),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage?.length === QUERY_LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      },
    }
  );

export const useScout = (id: string) =>
  useQuery(["scout", "id"], () => fetchScout(id));
