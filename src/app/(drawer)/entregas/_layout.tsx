import { DialogProvider } from "context/DialogContext";
import { MenuProvider } from "context/MenuContext";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <DialogProvider>
      <MenuProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade_from_bottom",
            animationDuration: 50,
          }}
        />
      </MenuProvider>
    </DialogProvider>
  );
}
