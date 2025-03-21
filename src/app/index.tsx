import { useGetMe } from "hooks";
import LoginForm from "components/auth/LoginForm";
import LogoIcon from "components/layout/AppLogoIcon";
import { LoadingScreen } from "components/layout/LoadingScreen";
import {
	Redirect
} from "expo-router";
import { View, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function Index() {
	const { data: userData, isLoading } = useGetMe();
	const { colors } = useTheme();

	if (userData) return <Redirect href="/(drawer)/(tabs)/scouts" />

	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				},
				{ backgroundColor: colors.background },
			]}
		>
			{isLoading && <LoadingScreen />}

			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: colors.background,
				}}
			>
				<View style={{ alignItems: "center", marginBottom: 20 }}>
					<LogoIcon width={100} height={100} />
					<Text
						style={{
							fontSize: 40,
							fontFamily: "notoserif",
							fontWeight: "bold",
							marginVertical: 10,
						}}
					>
						Scouts App
					</Text>
				</View>

				<LoginForm />

			</View>
		</SafeAreaView>
	);
}
