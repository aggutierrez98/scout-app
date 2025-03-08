import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  editFamiliar,
  fetchAllFamiliares,
  fetchFamiliar,
  fetchFamiliares,
  fetchFamiliaresScout,
  relateFamiliar,
  unrelateFamiliar,
} from "client/familiar";
import {
  FamiliarEditParams,
  FamiliarRelateParams,
  FamiliarUnrelateParams,
  FamiliaresQueryParams,
} from "interfaces/familiar";
import { FAMILIARES_QUERY_LIMIT } from "utils/constants";

export const useFamiliares = (queryParams: FamiliaresQueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "familiares",
      `searchParam${queryParams.searchQuery ?? ""}-searchQuery=${queryParams.searchQuery
      }`,
    ],
    queryFn: ({ pageParam }) => fetchFamiliares(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === FAMILIARES_QUERY_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useFamiliaresScout = (scoutId: string) =>
  useQuery({
    queryKey: ["familiares", "scout", scoutId],
    queryFn: () => fetchFamiliaresScout(scoutId),
  });

export const useFamiliar = (id: string) =>
  useQuery({
    queryKey: ["familiares", id],
    queryFn: () => fetchFamiliar(id),
  });

export const useEditFamiliar = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: FamiliarEditParams }) =>
      editFamiliar(id, data),
  });

export const useRelateFamiliar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      familiarId,
      data,
    }: {
      familiarId: string;
      data: FamiliarRelateParams;
    }) => relateFamiliar(familiarId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["familiares", variables.familiarId], data);
    },
  });
};

export const useUnrelateFamiliar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      familiarId,
      data,
    }: {
      familiarId: string;
      data: FamiliarUnrelateParams;
    }) => unrelateFamiliar(familiarId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["familiares", variables.familiarId], data);
    },
  });
};

export const useAllFamiliares = () =>
  useQuery({
    queryKey: ["familiares", "all"],
    queryFn: () => fetchAllFamiliares(),
  });