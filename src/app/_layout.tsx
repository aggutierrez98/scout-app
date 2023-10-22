import { lightTheme, darkTheme } from "../customTheme";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { MenuProvider } from "../context/MenuContext";
import MainLayout from "./MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditProvider } from "../context/EditContext";

const queryClient = new QueryClient();

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
        <MenuProvider>
          <EditProvider>
            <MainLayout />
          </EditProvider>
        </MenuProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
