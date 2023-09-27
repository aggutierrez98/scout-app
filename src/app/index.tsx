import App from "../components/App";
import { Link, Stack, useRootNavigationState } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
	// const navigationState = useRootNavigationState();

	// if (!navigationState?.key) {
	// 	// Temporary fix for router not being ready.
	// 	return;
	// }

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			{/* <Stack.Screen
				options={{
					// https://reactnavigation.org/docs/headers#setting-the-header-title
					title: "My home",
					// https://reactnavigation.org/docs/headers#adjusting-header-styles
					headerStyle: { backgroundColor: "#f4511e" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					// https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
				}}
			/> */}
			<Text>Home Screen</Text>

			<App />
		</View>
	);
}
