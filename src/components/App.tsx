import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
	return (
		<View>
			<Text>Open up App.tsx to start working on your app!</Text>

			{/* <Link href="/tuvi">TUVI</Link> */}

			<StatusBar style="auto" />
		</View>
	);
}
