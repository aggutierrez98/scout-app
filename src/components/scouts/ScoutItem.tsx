import ListItem from "components/ListItem";
import { useRouter } from "expo-router";
import { Scout } from "interfaces/scout";
import React, { Fragment, memo } from "react";
import { Divider, MD3Colors } from "react-native-paper";

interface Props {
  item: Scout;
}

export default memo(function ScoutItem({ item }: Props) {
  const router = useRouter();

  return (
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
  );
});
