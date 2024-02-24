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
import { DocumentosMenuProvider } from "context/DocumentosMenuContext";
import { EntregaMenuProvider } from "context/EntregasMenuContext";
import { PagoMenuProvider } from "context/PagosMenuContext";
import { ScoutMenuProvider } from "context/ScoutsMenuContext";

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
          <EditProvider>
            <PagoProvider>
              <DocumentoProvider>
                <EntregaProvider>
                  <DocumentosMenuProvider>
                    <EntregaMenuProvider>
                      <PagoMenuProvider>
                        <ScoutMenuProvider>
                          <Slot />
                        </ScoutMenuProvider>
                      </PagoMenuProvider>
                    </EntregaMenuProvider>
                  </DocumentosMenuProvider>
                </EntregaProvider>
              </DocumentoProvider>
            </PagoProvider>
          </EditProvider>
        </SnackBarProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
