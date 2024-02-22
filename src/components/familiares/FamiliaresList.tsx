import {
  ActivityIndicator,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { useFamiliares } from "client/familiar";
import { Familiar } from "interfaces/familiar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import FamiliarItem from "./FamiliarItem";

interface Props {
  searchQuery: string;
}

export default function FamiliaresList({ searchQuery }: Props) {
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
            <FamiliarItem item={item} />
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
