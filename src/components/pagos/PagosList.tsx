import {
	ActivityIndicator,
	List,
	Surface,
	Text,
	useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { Pago } from "interfaces/pago";
import { LoadingScreen } from "components/layout/LoadingScreen";
import PagoItem from "./PagoItem";
import { ModalDeletePago } from "./ModalDeletePago";
import { usePagoMenuContext } from "context/PagosMenuContext";
import { useDeletePago, usePagos } from "hooks";
import { getFlattenData } from "utils/getFlattenData";

interface Props {
	searchQuery: string;
}

export default function PagosList({ searchQuery }: Props) {
	const {
		tiempo: { tiempoDesde, tiempoHasta },
		metodoPago: { metodoPago },
		progresion: { progresionesSelected },
		patrulla: { patrullasSelected },
		funcion: { funcionesSelected },
		rendido: { rendido },
	} = usePagoMenuContext();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = usePagos({
		metodoPago,
		patrullas: patrullasSelected,
		progresiones: progresionesSelected,
		funciones: funcionesSelected,
		tiempoDesde,
		tiempoHasta,
		rendido: rendido as "si" | "no" | "",
		searchQuery,
	});
	const { isPending } = useDeletePago();
	const theme = useTheme();

	return (
		<>
			{(isLoading || isPending) && <LoadingScreen />}
			<List.Section
				style={{
					marginBottom: 50,
				}}
			>
				<FlatList
					data={getFlattenData(data)}
					keyExtractor={(scout) => scout.id}
					renderItem={({ item }: { item: Pago }) => (
						<PagoItem item={item} />
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

			<ModalDeletePago />
		</>
	);
}
