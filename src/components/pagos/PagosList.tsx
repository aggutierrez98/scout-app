import {
  ActivityIndicator,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { useMenuContext } from "context/MenuContext";
import { useDeletePago, usePagos } from "client/pago";
import { Pago } from "interfaces/pago";
import { LoadingScreen } from "components/layout/LoadingScreen";
import PagoItem from "./PagoItem";
import { ModalDeletePago } from "./ModalDeletePago";

interface Props {
  searchQuery: string;
}

export default function PagosList({ searchQuery }: Props) {
  const { isPending } = useDeletePago();

  const {
    tiempo: { tiempoDesde, tiempoHasta },
    metodoPago: { metodoPago },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
    rendido: { rendido },
  } = useMenuContext();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    usePagos({
      metodoPago,
      patrullas: patrullasSelected,
      progresiones: progresionesSelected,
      funciones: funcionesSelected,
      tiempoDesde,
      tiempoHasta,
      rendido: rendido as "si" | "no" | "",
      searchQuery,
    });

  const flattenData: Pago[] = data?.pages.flatMap((page) => page || []) || [];
  const theme = useTheme();

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
        }}
      >
        <FlatList
          data={flattenData}
          keyExtractor={(scout) => scout.id}
          renderItem={({ item }: { item: Pago }) => <PagoItem item={item} />}
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

      <ModalDeletePago />
    </>
  );
}
