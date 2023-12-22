import {
  ActivityIndicator,
  Divider,
  IconButton,
  List,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { Fragment } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";
import { usePagos } from "client/pago";
import { Pago } from "types/interfaces/pago";
import { LoadingScreen } from "components/layout/LoadingScreen";

interface Props {
  searchQuery: string;
}

export default function PagosList({ searchQuery }: Props) {
  const router = useRouter();

  const {
    tiempo: { tiempoDesde, tiempoHasta },
    metodoPago: { metodoPago },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
  } = useMenuContext();

  const { data, isError, fetchNextPage, hasNextPage, isLoading } = usePagos({
    patrullas: patrullasSelected,
    metodoPago,
    progresiones: progresionesSelected,
    funciones: funcionesSelected,
    tiempoDesde,
    tiempoHasta,
    searchQuery,
  });

  const flattenData: Pago[] = data?.pages.flatMap((page) => page || []) || [];

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
          renderItem={({ item }: { item: Pago }) => (
            <Fragment key={item.id}>
              <TouchableRipple
                onPress={() => {
                  router.push(`/(drawer)/(tabs)/pagos/${item.id}`);
                }}
              >
                <List.Item
                  title={`${item.fechaPago} - ${item.concepto}`}
                  right={(props) => (
                    <IconButton
                      style={{ margin: 0 }}
                      icon="delete"
                      size={20}
                      onPress={() => {
                        console.log("delete", item.id);
                      }}
                    />
                  )}
                />
              </TouchableRipple>
              <Divider style={{ marginVertical: -5 }} />
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
        />
      </List.Section>
    </>
  );
}
