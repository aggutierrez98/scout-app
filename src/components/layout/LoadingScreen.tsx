import React from "react";
import { Dimensions, Text, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const LoadingScreen = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        flex: 1,
        zIndex: 999,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <Text style={{ fontSize: 25, color: colors.primary, marginBottom: 20 }}>
        Cargando...
      </Text>
      <ActivityIndicator size={50} />
    </View>
  );
};
