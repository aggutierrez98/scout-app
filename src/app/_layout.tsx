import { Stack } from "expo-router/stack";
import { PaperProvider, DefaultTheme } from "react-native-paper";

export default function Layout() {
	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: "green",
			secondary: "red",
		},
	};

	return (
		<PaperProvider theme={theme}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				{/* <Stack.Screen name="/" options={{}} /> */}
			</Stack>
		</PaperProvider>
	);
}
