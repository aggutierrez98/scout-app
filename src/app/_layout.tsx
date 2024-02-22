import { lightTheme, darkTheme } from "../customTheme";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { MenuProvider } from "../context/MenuContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditProvider } from "../context/EditContext";
import { Slot } from "expo-router";
import { SnackBarProvider } from "context/SnackBarContext";
import "react-native-gesture-handler";
import { PagoProvider } from "context/PagosContext";
import { DocumentoProvider } from "context/DocumentoContext";
import { EntregaProvider } from "context/EntregaContext";

const queryClient = new QueryClient({
  // queryCache: {}
});

// if (__DEV__) {
//   import("react-query-native-devtools")
//     .then(({ addPlugin }) => {
//       addPlugin({ queryClient });
//     })
//     .catch((err) => {
//       console.log({ err });
//     });
// }

export default function Layout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <QueryClientProvider client={queryClient}>
        <SnackBarProvider>
          <MenuProvider>
            <EditProvider>
              <PagoProvider>
                <DocumentoProvider>
                  <EntregaProvider>
                    <Slot />
                  </EntregaProvider>
                </DocumentoProvider>
              </PagoProvider>
            </EditProvider>
          </MenuProvider>
        </SnackBarProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
