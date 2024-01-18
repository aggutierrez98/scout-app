import { MD3DarkTheme, MD3Theme, MD3LightTheme } from "react-native-paper";

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#001021",
    background: "#F1F7ED",
    surface: "#F1F7ED",
    error: "#B71F0E",
    backdrop: "#001021",
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#F1F7ED",
    primaryContainer: "#001021",
    secondary: "#F1F7ED",
    // secondaryContainer: "#001021",
    background: "#001021",
    tertiary: "#d0d0e8",
    tertiaryContainer: "#001021",

    surface: "#352e45",
    onTertiary: "#16ad52",
    backdrop: "#00102180",
    errorContainer: "red",
    // scrim: "red",
    // secondaryContainer: "#00102180",
    // outline: "red",
    // surfaceDisabled: "red",
    inversePrimary: "#F1F7ED",
    inverseOnSurface: "#F1F7ED",
    inverseSurface: "#001021",
    // elevation: MD3DarkTheme.colors.elevation,
    // onSurface: "red",
    // surfaceVariant: "#001021",

    //FOrms adentro
    surfaceVariant: "#352e45",
  },
};
