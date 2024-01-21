import {
  ActivityIndicator,
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  MD3Colors,
  Portal,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Fragment, useState } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useFamiliares } from "client/familiar";
import { Familiar } from "types/interfaces/familiar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import ListItem from "components/ListItem";
import { useDeleteEntrega, useEntregas } from "client/entregas";
import { useMenuContext } from "context/MenuContext";
import { Entrega } from "types/interfaces/entrega";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSnackBarContext } from "context/SnackBarContext";

interface Props {
  searchQuery: string;
}

export default function EntregasList({ searchQuery }: Props) {
  const router = useRouter();
  const { colors } = useTheme();
  const { toogleSnackBar } = useSnackBarContext();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { mutateAsync, isPending } = useDeleteEntrega();

  const {
    tiempo: { tiempoDesde, tiempoHasta },
    tipoEntrega: { tipoEntregasSelected },
    funcion: { funcionesSelected },
    patrulla: { patrullasSelected },
    progresion: { progresionesSelected },
  } = useMenuContext();

  const { data, isError, fetchNextPage, hasNextPage, isLoading } = useEntregas({
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
            <Fragment key={item.id}>
              <TouchableRipple
                onPress={() => {
                  router.push(`/(drawer)/entregas/${item.id}`);
                }}
              >
                <List.Item
                  title={`${item.fechaEntrega} - ${item.scout.nombre} ${item.scout.nombre}`}
                  left={() => (
                    <Icon
                      name={
                        item.tipoEntrega.startsWith("PROG")
                          ? "seal"
                          : item.tipoEntrega.startsWith("ESP")
                          ? "seal-variant"
                          : item.tipoEntrega.includes("GUIA")
                          ? "medal-outline"
                          : "tshirt-crew"
                      }
                      color={colors.primary}
                      size={35}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      style={{ margin: 0 }}
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
          <Dialog.Title>Eliminar entrega</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Esta seguro de eliminar la entrega seleccionada?
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
                  toogleSnackBar("Exito al eliminar la entrega", "success");
                else toogleSnackBar("Error al eliminar la entrega", "error");
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
