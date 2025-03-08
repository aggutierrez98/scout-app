import {
    useInfiniteQuery,
} from "@tanstack/react-query";
import {
    getNotifications,
} from "client/notifications";
import { NOTIFICATIONS_QUERY_LIMIT } from "utils/constants";

export const useNotifications = () => {

    const { data, ...rest } = useInfiniteQuery({
        queryKey: [
            "notifications",
        ],
        queryFn: ({ pageParam }) => getNotifications(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                lastPage?.notifications?.length === NOTIFICATIONS_QUERY_LIMIT
                    ? allPages.length + 1
                    : undefined;
            return nextPage;
        },
        initialPageParam: 1,
    })

    const flattenPages = data?.pages.flatMap(not => not?.notifications || [])

    return {
        data: {
            unreadCount: data?.pages[0]?.unreadCount || 0,
            pages: flattenPages
        },
        ...rest
    }
}

    ;