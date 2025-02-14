import { useDialogContext } from "context/DialogContext";
import { useRouter } from "expo-router";
import { Entrega } from "interfaces/entrega";
import React, { Fragment, memo } from "react";
import {
  Divider,
  IconButton,
  List,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  item: Entrega;
}

export default memo(function EntregaItem({ item }: Props) {
  const router = useRouter();
  const { setIdToDelete, showDialog } = useDialogContext();

  const { colors } = useTheme();

  return (
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
          right={() => (
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
  );
});
