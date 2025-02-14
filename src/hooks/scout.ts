import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllScouts, fetchScout, fetchScouts } from "client/scouts";
import { editScout } from "../client/scouts";
import { ScoutEditParams, ScoutsQueryParams } from "interfaces/scout";
import { SCOUTS_QUERY_LIMIT } from "utils/constants";

export const useScouts = (queryParams: ScoutsQueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "scouts",
      `searchParam${queryParams.searchQuery ?? ""}-equipos=${queryParams.equipos
      }-sexo=${queryParams.sexo}-progresion=${queryParams.progresiones
      }-rama=${queryParams.ramas
      }-funcion=${queryParams.funciones}`,
    ],
    queryFn: ({ pageParam }) => fetchScouts(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === SCOUTS_QUERY_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useScout = (id: string) =>
  useQuery({ queryKey: ["scout", id], queryFn: () => fetchScout(id) });

export const useAllScouts = (onlyEducadores?: boolean) =>
  useQuery({
    queryKey: ["scouts", "all"],
    queryFn: () => fetchAllScouts(onlyEducadores),
  });

export const useEditScout = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: ScoutEditParams }) =>
      editScout(id, data),
  });
