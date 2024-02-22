import {
  ActivityIndicator,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useDeleteEntrega, useEntregas } from "client/entregas";
import { useMenuContext } from "context/MenuContext";
import { Entrega } from "interfaces/entrega";
import EntregaItem from "./EntregaItem";
import { ModalDeleteEntrega } from "./ModalDeleteEntrega";

interface Props {
  searchQuery: string;
}

export default function EntregasList({ searchQuery }: Props) {
  const { isPending } = useDeleteEntrega();

  const {
    tiempo: { tiempoDesde, tiempoHasta },
    tipoEntrega: { tipoEntregasSelected },
    funcion: { funcionesSelected },
    patrulla: { patrullasSelected },
    progresion: { progresionesSelected },
  } = useMenuContext();

  const theme = useTheme();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    useEntregas({
      searchQuery,
      tipoEntregasSelected,
      tiempoDesde,
      tiempoHasta,
      funciones: funcionesSelected,
      patrullas: patrullasSelected,
      progresiones: progresionesSelected,
    });

  const flattenData: Entrega[] =
    data?.pages.flatMap((page) => page || []) || [];

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      {(isLoading || isPending) && <LoadingScreen />}

      <List.Section
        style={{
          marginBottom: 50,
          marginTop: 10,
        }}
      >
        <FlatList
          data={flattenData}
          keyExtractor={(entrega) => entrega.id}
          renderItem={({ item }: { item: Entrega }) => (
            <EntregaItem item={item} />
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

      <ModalDeleteEntrega />
    </>
  );
}
