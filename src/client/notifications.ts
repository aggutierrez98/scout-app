import * as SecureStore from "expo-secure-store";
import {
    Notification,
} from "interfaces/auth";
import api from "./api";
import { NOTIFICATIONS_QUERY_LIMIT } from "utils/constants";

export const getNotifications = async (pageParam: number) => {
    try {

        const offset = (pageParam - 1) * NOTIFICATIONS_QUERY_LIMIT;
        const token = await SecureStore.getItemAsync("secure_token");

        const { data, status } = await api.get(
            `/auth/notifications?offset=${offset}&limit=${NOTIFICATIONS_QUERY_LIMIT}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { notifications, unreadCount } = data

        return {
            notifications: notifications as Notification[],
            unreadCount
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};