import {
	ActivityIndicator,
	List,
	Surface,
	Text,
	useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { Entrega } from "interfaces/entrega";
import EntregaItem from "../entregas/EntregaItem";
import { ModalDeleteEntrega } from "../entregas/ModalDeleteEntrega";
// import { useEntregaMenuContext } from "context/EntregasMenuContext";
import { useDeleteEntrega, useEntregas } from "hooks";
import { getFlattenData } from "utils/getFlattenData";
import { useMenuContext } from "context/MenuContext";

interface Props {
	searchQuery: string;
}

export default function EntregasList({ searchQuery }: Props) {
	const { isPending } = useDeleteEntrega();

	const {
		tiempo: { tiempoDesde, tiempoHasta },
		tipoEntrega: { tipoEntregasSelected },
		funcion: { funcionesSelected },
		equipo: { equiposSelected },
		progresion: { progresionesSelected },
	} = useMenuContext();

	const theme = useTheme();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useEntregas({
		searchQuery,
		tipoEntregasSelected,
		tiempoDesde,
		tiempoHasta,
		funciones: funcionesSelected,
		equipos: equiposSelected,
		progresiones: progresionesSelected,
	});

	return (
		<>
			{(isLoading || isPending) && <LoadingScreen />}

			<List.Section
				style={{
					marginBottom: 50,
					marginTop: 10,
				}}
			>
				<FlatList
					data={getFlattenData(data)}
					keyExtractor={(entrega) => entrega.id}
					renderItem={({ item }: { item: Entrega }) => (
						<EntregaItem item={item} />
					)}
					onEndReached={() => hasNextPage && fetchNextPage()}
					onEndReachedThreshold={0.2}
					ListFooterComponent={
						hasNextPage ? (
							<ActivityIndicator
								animating
								style={{ marginTop: 25 }}
								size={"small"}
							/>
						) : null
					}
					ListEmptyComponent={
						<Surface
							style={{
								marginTop: 15,
								padding: 20,
								borderRadius: 5,
								alignItems: "center",
								justifyContent: "center",
								alignSelf: "center",
							}}
							elevation={1}
						>
							<Text variant="titleMedium">
								No se encontraron resultados
							</Text>
						</Surface>
					}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
							onRefresh={refetch}
							progressViewOffset={10}
							progressBackgroundColor={
								theme.colors.secondaryContainer
							}
							colors={[theme.colors.primary]}
						/>
					}
				/>
			</List.Section>

			<ModalDeleteEntrega />
		</>
	);
}
