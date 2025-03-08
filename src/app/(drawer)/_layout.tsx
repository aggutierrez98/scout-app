import { Redirect } from "expo-router";
import {
	Divider,
	Drawer as RNPDrawer,
	Text,
	useTheme,
	withTheme,
} from "react-native-paper";
import { useGetMe, useLogout } from "hooks";
import Drawer from "expo-router/drawer";
import LogoIcon from "components/layout/AppLogoIcon";
import { View, SafeAreaView } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { EditProvider } from "context/EditContext";
import { SnackBarWrapper } from "components/layout/SnackBar";
import { DialogProvider } from "context/DialogContext";
import { ROLES } from "utils/constants";

function AppLayout() {
	const { data: userData } = useGetMe();
	const logout = useLogout();
	const { colors } = useTheme();
	if (!userData) return <Redirect href="/" />;

	return (
		<>
			<DialogProvider >
				<EditProvider>
					<Drawer
						screenOptions={{
							headerShown: false,
							swipeEdgeWidth: 100,
						}}
						drawerContent={({
							state: {
								routes,
								key,
								index,
							},
							navigation,
						}) => (
							<SafeAreaView
								style={{
									flex: 1,
									paddingTop: 60,
									backgroundColor:
										colors.background,
									justifyContent:
										"space-between",
								}}
							>
								<RNPDrawer.Section>
									<View
										style={{
											alignItems:
												"center",
										}}
									>
										<LogoIcon />
										<Text
											style={{
												alignSelf:
													"center",
												fontSize: 20,
												fontWeight:
													"bold",
												marginVertical: 10,
											}}
										>
											Scouts App
										</Text>
									</View>
									<Divider
										style={{
											marginVertical: 10,
										}}
									/>
									<RNPDrawer.Item
										key={"home"}
										label={"Scouts"}
										icon={"home"}
										onPress={() => {
											navigation.dispatch(
												{
													...CommonActions.navigate(
														routes[0]
															.name,
														routes[0]
															.params,
													),
													target: key,
												},
											);
										}}
										active={
											index === 0
										}
									/>
									<RNPDrawer.Item
										key={"entregas"}
										label={
											"Entregas"
										}
										icon={"medal"}
										onPress={() => {
											navigation.dispatch(
												{
													...CommonActions.navigate(
														routes[1]
															.name,
														routes[1]
															.params,
													),
													target: key,
												},
											);
										}}
										active={
											index === 1
										}
									/>
									<RNPDrawer.Item
										key={
											"familiares"
										}
										label={
											"Familiares"
										}
										icon={
											"account-child"
										}
										onPress={() => {
											navigation.dispatch(
												{
													...CommonActions.navigate(
														routes[2]
															.name,
														routes[2]
															.params,
													),
													target: key,
												},
											);
										}}
										active={
											index === 2
										}
									/>
									{userData.role ===
										ROLES.ADMINISTRADOR && (
											<RNPDrawer.Item
												key={
													"users"
												}
												label={
													"Usuarios"
												}
												icon={
													"account-group"
												}
												onPress={() => {
													navigation.dispatch(
														{
															...CommonActions.navigate(
																routes[3]
																	.name,
																routes[3]
																	.params,
															),
															target: key,
														},
													);
												}}
												active={
													index ===
													3
												}
											/>
										)}
									<RNPDrawer.Item
										key={"user"}
										label={
											userData.username
										}
										icon={
											"account-circle"
										}
										onPress={() => {
											navigation.dispatch(
												{
													...CommonActions.navigate(
														routes[4]
															.name,
														routes[4]
															.params,
													),
													target: key,
												},
											);
										}}
										active={
											index === 4
										}
									/>
								</RNPDrawer.Section>
								<RNPDrawer.Section
									style={{
										flexDirection:
											"column-reverse",
									}}
								>
									<RNPDrawer.Item
										key={"logout"}
										label={
											"Cerrar sesion"
										}
										icon={"logout"}
										onPress={() => {
											logout();
										}}
									/>
								</RNPDrawer.Section>
							</SafeAreaView>
						)}
					>
						<Drawer.Screen
							name="(tabs)"
							options={{
								drawerLabel: "Scouts",
							}}
						/>
						<Drawer.Screen
							name="entregas"
							options={{
								drawerLabel: "Entregas",
							}}
						/>
						<Drawer.Screen
							name="familiares"
							options={{
								drawerLabel:
									"Familiares",
							}}
						/>
						<Drawer.Screen
							name="users"
							options={{
								drawerLabel: "Users",
							}}
						/>
						<Drawer.Screen
							name="user"
							options={{
								drawerLabel: "User",
							}}
						/>
					</Drawer>
					<SnackBarWrapper />
				</EditProvider>
			</DialogProvider>
		</>
	);
}

export default withTheme(AppLayout);
