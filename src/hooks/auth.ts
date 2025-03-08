import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";
import {
	createUser,
	fetchUser,
	fetchUsers,
	firstLogin,
	getMe,
	loginUser,
	modifyUser,
	renewLogin,
} from "client/auth";
import { FirstLoginResponse, LoginResponse } from "interfaces/scout";
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
		retry: 0,
		throwOnError(error, query) {
			const queryClient = useQueryClient();
			queryClient.resetQueries();
			return false;
		},
	});

export const useGetMe = () =>
	useQuery({
		queryKey: ["user"],
		queryFn: getMe,
		retry: 0,
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
		onSuccess: async ({ token }: LoginResponse) => {
			await SecureStore.setItemAsync("secure_token", token);
			queryClient.invalidateQueries({
				queryKey: ["user"]
			})
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

export const useFirstLogin = (
	setError: UseFormSetError<{
		username: string;
		password: string;
	}>,
) => {
	return useMutation({
		mutationFn: firstLogin,
		onError: (data: AxiosError) => {
			if (data.code === "ERR_NETWORK") {
				setError("root", {
					type: "server",
					message: "Servidor no disponible",
				});
			}
			else if (data.response) {
				setError("username", {
					type: "credentials",
					message: "El nombre de usuario ingresado no es valido",
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
