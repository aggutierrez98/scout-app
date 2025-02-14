import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";
import {
	createUser,
	fetchUser,
	fetchUsers,
	loginUser,
	modifyUser,
	renewLogin,
} from "client/auth";
import { LoginResponse } from "interfaces/scout";
import { USERS_QUERY_LIMIT } from "utils/constants";
import {
	UserCreateParams,
	UserModifyParams,
	UsersQueryParams,
} from "interfaces/auth";

export const useRenewLogin = () =>
	useQuery({
		queryKey: ["user"],
		queryFn: renewLogin,
		retry: false,
		throwOnError(error, query) {
			const queryClient = useQueryClient();
			queryClient.resetQueries();
			return false;
		},
	});

export const useLogin = (
	setError: UseFormSetError<{
		username: string;
		password: string;
	}>,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: async ({ token, ...data }: LoginResponse) => {
			await SecureStore.setItemAsync("secure_token", token);
			console.log(token, data);
			queryClient.setQueryData(["user"], () => {
				return {
					id: data.id,
					username: data.username,
					name: `${data.scout.apellido} ${data.scout.nombre}`,
					rol: data.role,
					funcion: data.scout.funcion,
					dni: data.scout.dni,
					sexo: data.scout.sexo,
					telefono: data.scout.telefono,
					mail: data.scout.mail,
				};
			});
		},

		onError: (data: AxiosError) => {
			if (data.code === "ERR_NETWORK") {
				setError("root", {
					type: "server",
					message: "Servidor no disponible",
				});
			} else if (data.response) {
				setError("username", {
					type: "credentials",
					message: "Credenciales invalidas",
				});
				setError("password", {
					type: "credentials",
					message: "Credenciales invalidas",
				});
			}
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	const logout = async () => {
		await SecureStore.deleteItemAsync("secure_token");
		queryClient.invalidateQueries({ queryKey: ["user"] });
	};

	return logout;
};

export const useUsers = (queryParams: UsersQueryParams) =>
	useInfiniteQuery({
		queryKey: ["users", `searchParam${queryParams.searchQuery ?? ""}`],
		queryFn: ({ pageParam }) => fetchUsers(pageParam, queryParams),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage =
				lastPage?.length === USERS_QUERY_LIMIT
					? allPages.length + 1
					: undefined;
			return nextPage;
		},
		initialPageParam: 1,
	});

export const useUser = (id: string) =>
	useQuery({ queryKey: ["users", id], queryFn: () => fetchUser(id) });

export const useModifyUser = () =>
	useMutation({
		mutationFn: ({ id, data }: { id: string; data: UserModifyParams }) =>
			modifyUser(id, data),
	});

export const useCreateUser = () =>
	useMutation({
		mutationFn: (data: UserCreateParams) => createUser(data),
	});
