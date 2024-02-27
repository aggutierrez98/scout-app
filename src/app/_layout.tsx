import { lightTheme, darkTheme } from "../customTheme";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { SnackBarProvider } from "context/SnackBarContext";
import "react-native-gesture-handler";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient({
  // queryCache: {}
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;
  useReactQueryDevTools(queryClient);

  return (
    <PaperProvider theme={paperTheme}>
      <QueryClientProvider client={queryClient}>
        <SnackBarProvider>
          <Slot />
        </SnackBarProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
