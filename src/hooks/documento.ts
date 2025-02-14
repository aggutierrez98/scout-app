import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createDocumento,
  editDocumento,
  fetchDocumento,
  fetchDocuments,
  fetchDocumentsData,
} from "client/documento";
import { deleteDocumento } from "../client/documento";
import { DOCUMENTOS_QUERY_LIMIT } from "utils/constants";
import {
  DocumentoCreateParams,
  DocumentoEditParams,
  DocumentosQueryParams,
} from "interfaces/documento";

export const useDocuments = (queryParams: DocumentosQueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "documents",
      `searchParam${queryParams.searchQuery ?? ""}-equipos=${queryParams.equipos
      }-progresion=${queryParams.progresiones}-funcion=${queryParams.funciones
      }-ramas=${queryParams.ramas
      }-funcion=${queryParams.funciones}-vence=${queryParams.vence
      }-tiempoDesde=${queryParams.tiempoDesde}-tiempoHasta=${queryParams.tiempoHasta
      }`,
    ],
    queryFn: ({ pageParam }) => fetchDocuments(pageParam, queryParams),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === DOCUMENTOS_QUERY_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });
export const useDocumentsData = () =>
  useQuery({
    queryKey: ["documents-data"],
    queryFn: fetchDocumentsData,
  });

export const useDocumento = (id: string) =>
  useQuery({
    queryKey: ["documento", id],
    queryFn: () => fetchDocumento(id),
  });

export const useEditDocumento = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: DocumentoEditParams }) =>
      editDocumento(id, data),
  });

export const useDeleteDocumento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDocumento(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
  });
};

export const useCreateDocumento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DocumentoCreateParams) => createDocumento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
  });
};
