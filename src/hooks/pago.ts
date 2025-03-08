import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createPago,
	deletePago,
	editPago,
	fetchPago,
	fetchPagos,
} from "client/pago";
import {
	PagoCreateParams,
	PagoEditParams,
	PagosQueryParams,
} from "interfaces/pago";
import { PAGOS_QUERY_LIMIT } from "utils/constants";

export const usePagos = (queryParams: PagosQueryParams) =>
	useInfiniteQuery({
		queryKey: [
			"pagos",
			`searchParam${queryParams.searchQuery ?? ""}-equipos=${queryParams.equipos
			}-metodoPago=${queryParams.metodoPago}-progresion=${queryParams.progresiones
			}-ramas=${queryParams.ramas
			}-funcion=${queryParams.funciones}
      -rendido=${queryParams.rendido}
      -tiempoDesde=${queryParams.tiempoDesde}-tiempoHasta=${queryParams.tiempoHasta
			}-scoutId=${queryParams.scoutId}`,
		],
		queryFn: ({ pageParam }) => fetchPagos(pageParam, queryParams),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage =
				lastPage?.length === PAGOS_QUERY_LIMIT
					? allPages.length + 1
					: undefined;
			return nextPage;
		},
		initialPageParam: 1,
	});

export const usePago = (id: string) =>
	useQuery({ queryKey: ["pago", id], queryFn: () => fetchPago(id) });

export const useEditPago = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: PagoEditParams }) =>
			editPago(id, data),
		// onSuccess: (data) => {
		// 	queryClient.invalidateQueries({
		// 		queryKey: ["pagos"]
		// 	});
		// },
	});
}

export const useCreatePago = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: PagoCreateParams) => createPago(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pagos"] });
		},
	});
};

export const useDeletePago = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deletePago(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pagos"] });
		},
	});
};
