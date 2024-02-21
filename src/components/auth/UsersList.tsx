import {
  ActivityIndicator,
  Avatar,
  Divider,
  List,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Fragment } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useUsers } from "client/auth";
import { User } from "types/interfaces/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";

interface Props {
  searchQuery: string;
}

export default function UsersList({ searchQuery }: Props) {
  const router = useRouter();
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
        renderItem={({ item }: { item: User }) => (
          <Fragment key={item.id}>
            <TouchableRipple
              onPress={() => {
                router.push(`/(drawer)/users/${item.id}`);
              }}
              rippleColor="rgba(0, 0, 0, .12)"
            >
              <List.Item
                title={`${item.username}`}
                style={{ alignItems: "center" }}
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <Avatar.Text
                    size={30}
                    label={item.username.slice(0, 2).toLocaleUpperCase()}
                  />
                )}
              />
            </TouchableRipple>
            <Divider />
          </Fragment>
        )}
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
