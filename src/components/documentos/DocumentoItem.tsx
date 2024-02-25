import { useDocumentoContext } from "context/DocumentoContext";
import { useRouter } from "expo-router";
import { Documento } from "interfaces/documento";
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
  item: Documento;
}

export default memo(function DocumentoItem({ item }: Props) {
  const router = useRouter();
  const { colors } = useTheme();
  const { setIdToDelete, showDialog } = useDocumentoContext();

  return (
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
              color={item.documento.vence ? colors.tertiary : colors.primary}
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
