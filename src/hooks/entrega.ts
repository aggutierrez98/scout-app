import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEntrega,
  editEntrega,
  fetchEntrega,
  fetchEntregas,
  deleteEntrega,
} from "client/entregas";
import {
  EntregaCreateParams,
  EntregaEditParams,
  EntregasQueryParams,
} from "interfaces/entrega";
import { ENTREGAS_QUERY_LIMIT } from "utils/constants";

export const useEntregas = (queryParams: EntregasQueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "entregas",
      `searchParam${queryParams.searchQuery ?? ""}-equipos=${queryParams.equipos
      }-progresion=${queryParams.progresiones}-funcion=${queryParams.funciones}-ramas=${queryParams.ramas
      }-tipoEntrega=${queryParams.tipoEntregasSelected}-tiempoDesde=${queryParams.tiempoDesde
      }-tiempoHasta=${queryParams.tiempoHasta}-scoutId=${queryParams.scoutId}`,
    ],
    queryFn: ({ pageParam }) => fetchEntregas(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === ENTREGAS_QUERY_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useEntrega = (id: string) =>
  useQuery({
    queryKey: ["entregas", id],
    queryFn: () => fetchEntrega(id),
  });

export const useCreateEntrega = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EntregaCreateParams) => createEntrega(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entregas"] });
    },
  });
};

export const useEditEntrega = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: EntregaEditParams }) =>
      editEntrega(id, data),
  });

export const useDeleteEntrega = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteEntrega(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entregas"] });
    },
  });
};
