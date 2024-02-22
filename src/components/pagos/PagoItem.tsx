import { usePagoContext } from "context/PagosContext";
import { useRouter } from "expo-router/src/hooks";
import { Pago } from "interfaces/pago";
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
  item: Pago;
}

export default memo(function PagoItem({ item }: Props) {
  const router = useRouter();
  const { setIdToDelete, showDialog } = usePagoContext();

  const { colors } = useTheme();

  return (
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
