import {
  ActivityIndicator,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { useUsers } from "client/auth";
import { User } from "interfaces/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import UserItem from "./UserItem";

interface Props {
  searchQuery: string;
}

export default function UsersList({ searchQuery }: Props) {
  const theme = useTheme();
  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    useUsers({
      searchQuery,
    });
  const flattenData: User[] = data?.pages.flatMap((page) => page || []) || [];

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <List.Section
      style={{
        marginBottom: 50,
        marginTop: 10,
      }}
    >
      {isLoading && <LoadingScreen />}

      <FlatList
        data={flattenData}
        keyExtractor={(user) => user.id}
        renderItem={({ item }: { item: User }) => <UserItem item={item} />}
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          hasNextPage ? (
            <ActivityIndicator
              animating
              style={{ marginTop: 25 }}
              size={"small"}
            />
          ) : null
        }
        ListEmptyComponent={
          <Surface
            style={{
              marginTop: 15,
              padding: 20,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            elevation={1}
          >
            <Text variant="titleMedium">No se encontraron resultados</Text>
          </Surface>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            progressViewOffset={10}
            progressBackgroundColor={theme.colors.secondaryContainer}
            colors={[theme.colors.primary]}
          />
        }
      />
    </List.Section>
  );
}
