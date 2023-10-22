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
    background: "#001021",
    surface: "#352e45",
    error: "#B71F0E",
    backdrop: "#001021",
  },
};
