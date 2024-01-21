import {
  ActivityIndicator,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  Portal,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Fragment, useState } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";
import { useDeletePago, usePagos } from "client/pago";
import { Pago } from "types/interfaces/pago";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useSnackBarContext } from "context/SnackBarContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  searchQuery: string;
}

export default function PagosList({ searchQuery }: Props) {
  const { toogleSnackBar } = useSnackBarContext();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { mutateAsync, isPending } = useDeletePago();
  const { colors } = useTheme();
  const router = useRouter();

  const {
    tiempo: { tiempoDesde, tiempoHasta },
    metodoPago: { metodoPago },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
    rendido: { rendido },
  } = useMenuContext();

  const { data, fetchNextPage, hasNextPage, isLoading } = usePagos({
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
          renderItem={({ item }: { item: Pago }) => (
            <Fragment key={item.id}>
              <TouchableRipple
                onPress={() => {
                  router.push(`/(drawer)/(tabs)/pagos/${item.id}`);
                }}
                style={{
                  paddingHorizontal: 5,
                }}
              >
                <List.Item
                  title={`${item.fechaPago} - ${item.concepto}`}
                  left={() => (
                    <Icon
                      name={item.rendido ? "beaker-check" : "beaker"}
                      color={item.rendido ? colors.primary : colors.tertiary}
                      size={35}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      style={{ margin: 0, marginRight: -20 }}
                      icon="delete"
                      size={20}
                      onPress={() => {
                        setIdToDelete(item.id);
                        showDialog();
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Eliminar pago</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Esta seguro de eliminar el pago seleccionado?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              textColor="red"
              onPress={async () => {
                hideDialog();
                const resp = await mutateAsync({ id: idToDelete });
                if (resp)
                  toogleSnackBar("Exito al eliminar el pago", "success");
                else toogleSnackBar("Error al eliminar el pago", "error");
              }}
            >
              Confirmar
            </Button>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
