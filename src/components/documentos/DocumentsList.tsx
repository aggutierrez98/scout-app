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
import { FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useDeleteDocumento, useDocuments } from "client/documento";
import { Documento } from "interfaces/documento";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSnackBarContext } from "context/SnackBarContext";

interface Props {
  searchQuery: string;
}

export default function DocumentsList({ searchQuery }: Props) {
  const { toogleSnackBar } = useSnackBarContext();
  const [visible, setVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { mutateAsync, isPending } = useDeleteDocumento();
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const router = useRouter();
  const { colors } = useTheme();

  const {
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
    vence: { vence },
    tiempo: { tiempoDesde, tiempoHasta },
  } = useMenuContext();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch, isRefetching } =
    useDocuments({
      patrullas: patrullasSelected,
      vence,
      progresiones: progresionesSelected,
      funciones: funcionesSelected,
      searchQuery,
      tiempoDesde,
      tiempoHasta,
    });

  const flattenData: Documento[] =
    data?.pages.flatMap((page) => page || []) || [];
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
          renderItem={({ item }: { item: Documento }) => (
            <Fragment key={item.id}>
              <TouchableRipple
                style={{
                  paddingHorizontal: 5,
                }}
                onPress={() => {
                  router.push(`/(drawer)/(tabs)/documentos/${item.id}`);
                }}
              >
                <List.Item
                  title={`${item.fechaPresentacion} - ${item.documento.nombre}`}
                  left={() => (
                    <Icon
                      name={item.documento.vence ? "file-clock" : "file-check"}
                      color={
                        item.documento.vence ? colors.tertiary : colors.primary
                      }
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Eliminar documento</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Esta seguro de eliminar el documento seleccionado?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained-tonal"
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
            <Button onPress={hideDialog} mode="contained-tonal">
              Cancelar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
