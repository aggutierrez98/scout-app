import React from "react";
import { List, TouchableRipple } from "react-native-paper";

interface Props {
  title: string;
  icon: string;
  iconColor?: string;
  action: () => void;
}

export default function ScoutItem({ action, title, icon, iconColor }: Props) {
  return (
    <TouchableRipple onPress={action} rippleColor="rgba(0, 0, 0, .12)">
      <List.Item
        title={title}
        left={() => <List.Icon icon={icon} color={iconColor ?? ""} />}
      />
    </TouchableRipple>
  );
}
