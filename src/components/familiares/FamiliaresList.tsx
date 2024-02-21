import {
  ActivityIndicator,
  Avatar,
  Divider,
  List,
  MD3Colors,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Fragment } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { User } from "types/interfaces/auth";
import { useFamiliares } from "client/familiar";
import { Familiar } from "types/interfaces/familiar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import ListItem from "components/ListItem";

interface Props {
  searchQuery: string;
}

export default function FamiliaresList({ searchQuery }: Props) {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    useFamiliares({
      searchQuery,
    });

  const theme = useTheme();
  const flattenData: Familiar[] =
    data?.pages.flatMap((page) => page || []) || [];

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <List.Section
        style={{
          marginBottom: 50,
          marginTop: 10,
        }}
      >
        <FlatList
          data={flattenData}
          keyExtractor={(familiar) => familiar.id}
          renderItem={({ item }: { item: Familiar }) => (
            <Fragment key={item.id}>
              <ListItem
                title={`${item.apellido} ${item.nombre}`}
                icon={item.sexo === "M" ? "human-male" : "human-female"}
                iconColor={
                  item.sexo === "F" ? MD3Colors.tertiary70 : MD3Colors.primary70
                }
                action={() => {
                  router.push(`/(drawer)/familiares/${item.id}`);
                }}
              />
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
    </>
  );
}
