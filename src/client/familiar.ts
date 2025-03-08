import * as SecureStore from "expo-secure-store";
import {
	Familiar,
	FamiliarEditParams,
	FamiliarRelateParams,
	FamiliarUnrelateParams,
	FamiliarWithDetails,
	FamiliaresQueryParams,
} from "interfaces/familiar";
import api from "./api";
import { FAMILIARES_QUERY_LIMIT } from "utils/constants";

export const fetchFamiliar = async (id: string) => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.get(`/familiar/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return data as FamiliarWithDetails;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const editFamiliar = async (
	familiarId: string,
	familiarData: FamiliarEditParams,
) => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.put(
			`/familiar/${familiarId}`,
			familiarData,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return data as Familiar;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchFamiliares = async (
	pageParam: number,
	{ searchQuery }: FamiliaresQueryParams,
) => {
	try {
		const offset = (pageParam - 1) * FAMILIARES_QUERY_LIMIT;
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.get(
			`/familiar?offset=${offset}&limit=${FAMILIARES_QUERY_LIMIT}&nombre=${searchQuery}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return data as Familiar[];
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchFamiliaresScout = async (scoutId: string,) => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.get(
			`/familiar?scoutId=${scoutId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return data as Familiar[];
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const relateFamiliar = async (
	familiarId: string,
	familiarData: FamiliarRelateParams,
) => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.put(
			`/familiar/relate/${familiarId}`,
			familiarData,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return data as Familiar;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const unrelateFamiliar = async (
	familiarId: string,
	familiarData: FamiliarUnrelateParams,
) => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		const { data, status } = await api.put(
			`/familiar/unrelate/${familiarId}`,
			familiarData,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return data as Familiar;
	} catch (error) {
		console.log(error);
		return null;
	}
};


export const fetchAllFamiliares = async () => {
	try {
		const token = await SecureStore.getItemAsync("secure_token");

		// // const json = await scoutsApi.get("scout").json();
		const { data } = await api.get(
			`/familiar/?select=nombre,apellido,id,uuid&existingUser=false`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data as {
			id: string;
			nombre: string;
			apellido: string
		}[];
	} catch (error) {
		console.log(error);
		return null;
	}
};
