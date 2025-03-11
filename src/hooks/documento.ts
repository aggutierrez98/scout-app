import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createDocumento,
  fillDocumento,
  editDocumento,
  fetchDocumento,
  fetchDocuments,
  fetchDocumentsData,
  getDocumentUrl,
  signDocumento,
  uploadDocumento,
} from "client/documento";
import { deleteDocumento } from "../client/documento";
import { DOCUMENTOS_QUERY_LIMIT } from "utils/constants";
import {
  DocumentoCreateParams,
  DocumentoEditParams,
  DocumentoFillParams,
  DocumentoSignParams,
  DocumentosQueryParams,
  DocumentoUploadParams,
} from "interfaces/documento";
import { useTheme } from "react-native-paper";
import { useGetMe } from "./auth";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { useSnackBarContext } from '../context/SnackBarContext';

export const useDocuments = (queryParams: DocumentosQueryParams) =>
  useInfiniteQuery({
    queryKey: [
      "documents",
      `searchParam${queryParams.searchQuery ?? ""}-equipos=${queryParams.equipos
      }-progresion=${queryParams.progresiones}-funcion=${queryParams.funciones
      }-ramas=${queryParams.ramas
      }-funcion=${queryParams.funciones}-vence=${queryParams.vence
      }-tiempoDesde=${queryParams.tiempoDesde}-tiempoHasta=${queryParams.tiempoHasta
      }-scoutId=${queryParams.scoutId}`,
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

export const useFillDocumento = (
  setError: UseFormSetError<{
    familiarId: string;
    signature: string;
  }>,

) => {
  const { dark } = useTheme()
  const { data } = useGetMe()
  const familiarId = data?.familiar?.id
  const queryClient = useQueryClient();
  const { toogleSnackBar } = useSnackBarContext();
  return useMutation({
    mutationFn: (data: Omit<DocumentoFillParams, "theme">) => fillDocumento({ ...data, theme: dark ? "dark" : "light", familiarId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
    // throwOnError: true,
    onError: (data: AxiosError) => {
      if (data.code === "ERR_NETWORK") {
        setError("root", {
          type: "server",
          message: "Servidor no disponible",
        });
      }
      else if (data.response) {
        const { name, message } = data.response.data as {
          name: string,
          message: string
        }

        if (name === "BAD_PARAMETERS") {
          const errorMessage = message.split("\n")[1].split("]: ")[1]
          toogleSnackBar(errorMessage, "error");
        }
      }
    },
  });
};

export const useSignDocumento = (
  setError: UseFormSetError<{
    familiarId: string;
    signature: string;
  }>,

) => {
  const { dark } = useTheme()
  const queryClient = useQueryClient();
  const { toogleSnackBar } = useSnackBarContext();
  return useMutation({
    mutationFn: (data: Omit<DocumentoSignParams, "theme">) => signDocumento({ ...data, theme: dark ? "dark" : "light" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
    onError: (data: AxiosError) => {
      if (data.code === "ERR_NETWORK") {
        setError("root", {
          type: "server",
          message: "Servidor no disponible",
        });
      }
      else if (data.response) {
        const { name, message } = data.response.data as {
          name: string,
          message: string
        }

        if (name === "BAD_PARAMETERS") {
          const errorMessage = message.split("\n")[1].split("]: ")[1]
          toogleSnackBar(errorMessage, "error");
        }
      }
    },
  });
};

export const useUploadDocumento = (
  setError: UseFormSetError<{
    familiarId: string;
    signature: string;
  }>,

) => {
  const queryClient = useQueryClient();
  const { toogleSnackBar } = useSnackBarContext();
  return useMutation({
    mutationFn: (data: DocumentoUploadParams) => uploadDocumento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentos"] });
    },
    onError: (data: AxiosError) => {
      if (data.code === "ERR_NETWORK") {
        setError("root", {
          type: "server",
          message: "Servidor no disponible",
        });
      }
      else if (data.response) {
        const { name, message } = data.response.data as {
          name: string,
          message: string
        }

        if (name === "BAD_PARAMETERS") {
          const errorMessage = message.split("\n")[1].split("]: ")[1]
          toogleSnackBar(errorMessage, "error");
        }
      }
    },
  });
};

export const useDownloadDocumento = (id: string) =>
  useQuery({
    queryKey: ["documento", id, "download"],
    queryFn: () => getDocumentUrl(id),
  });