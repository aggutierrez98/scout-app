import { InfiniteData } from "@tanstack/react-query";
import { Notification, NotificationData, User } from "interfaces/auth";
import { Documento } from "interfaces/documento";
import { Entrega } from "interfaces/entrega";
import { Familiar } from "interfaces/familiar";
import { Pago } from "interfaces/pago";
import { Scout } from "interfaces/scout";


export function getFlattenData(
	data: InfiniteData<Scout[] | null, unknown> | undefined,
): Scout[];
export function getFlattenData(
	data: InfiniteData<Documento[] | null, unknown> | undefined,
): Documento[];
export function getFlattenData(
	data: InfiniteData<Pago[] | null, unknown> | undefined,
): Pago[];
export function getFlattenData(
	data: InfiniteData<Entrega[] | null, unknown> | undefined,
): Entrega[];
export function getFlattenData(
	data: InfiniteData<Familiar[] | null, unknown> | undefined,
): Familiar[];
export function getFlattenData(
	data: InfiniteData<User[] | null, unknown> | undefined,
): User[];
export function getFlattenData(
	data: InfiniteData<NotificationData | null, unknown> | undefined,
): NotificationData[];
export function getFlattenData(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: InfiniteData<any | null, unknown> | undefined,
) {

	return data?.pages.flatMap((page) => page || []) || [];
}
