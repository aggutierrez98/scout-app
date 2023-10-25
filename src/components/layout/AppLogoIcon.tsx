import React from "react";
import { Image, View, StyleSheet } from "react-native";

interface Props {
  width?: number;
  height?: number;
}

export default function LogoIcon({ width = 50, height = 50 }: Props) {
  return (
    <View style={{}}>
      <Image
        source={require("../../../assets/scout-logo.png")}
        fadeDuration={0}
        style={{
          width,
          height,
          borderRadius: 100,
        }}
      />
    </View>
  );
}
