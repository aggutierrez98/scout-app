import { useRouter } from "expo-router";
import { User } from "interfaces/auth";
import React, { Fragment, memo } from "react";
import { Avatar, Divider, List, TouchableRipple } from "react-native-paper";

interface Props {
  item: User;
}

export default memo(function UserItem({ item }: Props) {
  const router = useRouter();

  return (
    <Fragment key={item.id}>
      <TouchableRipple
        onPress={() => {
          router.push(`/(drawer)/users/${item.id}`);
        }}
        rippleColor="rgba(0, 0, 0, .12)"
      >
        <List.Item
          title={`${item.username}`}
          style={{ alignItems: "center" }}
          titleStyle={{ fontSize: 20 }}
          left={() => (
            <Avatar.Text
              size={30}
              label={item.username.slice(0, 2).toLocaleUpperCase()}
            />
          )}
        />
      </TouchableRipple>
      <Divider />
    </Fragment>
  );
});
