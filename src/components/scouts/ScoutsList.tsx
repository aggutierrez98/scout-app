import {
  ActivityIndicator,
  Divider,
  List,
  MD3Colors,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import ListItem from "../ListItem";
import { useScouts } from "../../client/scouts";
import { Fragment } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Scout } from "interfaces/scout";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";
import { LoadingScreen } from "components/layout/LoadingScreen";

interface Props {
  searchQuery: string;
}

export default function ScoutsList({ searchQuery }: Props) {
  const router = useRouter();

  const {
    sexo: { sexo },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
  } = useMenuContext();
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
          renderItem={({ item }: { item: Scout }) => (
            <Fragment key={item.id}>
              <ListItem
                title={`${item.apellido} ${item.nombre}`}
                icon={item.sexo === "M" ? "human-male" : "human-female"}
                iconColor={
                  item.sexo === "F" ? MD3Colors.tertiary70 : MD3Colors.primary70
                }
                action={() => {
                  router.push(`/(drawer)/(tabs)/scouts/${item.id}`);
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
