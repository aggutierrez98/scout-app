import React from "react";
import { List, TouchableRipple } from "react-native-paper";
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  title: string;
  icon: string;
  iconColor?: string;
  action: () => void;
}

export default function ListItem({ action, title, icon, iconColor }: Props) {
  return (
    <TouchableRipple onPress={action} rippleColor="rgba(0, 0, 0, .12)">
      <List.Item
        title={title}
        titleStyle={{ fontSize: 18 }}
        style={{ height: 65, justifyContent: "center" }}
        // left={() => <List.Icon icon={icon} color={iconColor ?? ""} size={24} />}
        left={() => <Icon name={icon} color={iconColor ?? ""} size={35} />}
      />
    </TouchableRipple>
  );
}
