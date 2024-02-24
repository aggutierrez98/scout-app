import {
  ActivityIndicator,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { Scout } from "interfaces/scout";
import { LoadingScreen } from "components/layout/LoadingScreen";
import ScoutItem from "./ScoutItem";
import { useScoutMenuContext } from "context/ScoutsMenuContext";
import { useScouts } from "hooks";

interface Props {
  searchQuery: string;
}

export default function ScoutsList({ searchQuery }: Props) {
  const {
    sexo: { sexo },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
  } = useScoutMenuContext();
  const theme = useTheme();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    useScouts({
      patrullas: patrullasSelected,
      sexo,
      progresiones: progresionesSelected,
      funciones: funcionesSelected,
      searchQuery,
    });

  const flattenData: Scout[] = data?.pages.flatMap((page) => page || []) || [];

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
          keyExtractor={(scout) => scout.id}
          renderItem={({ item }: { item: Scout }) => <ScoutItem item={item} />}
          onEndReached={loadNextPageData}
          onEndReachedThreshold={0.1}
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
