import {
	ActivityIndicator,
	List,
	Surface,
	Text,
	useTheme,
} from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useDeleteDocumento, useDocuments } from "hooks";
import { Documento } from "interfaces/documento";
import { ModalDeleteDocumento } from "./ModalDeleteDocumento";
import DocumentoItem from "./DocumentoItem";
import { useDocumentosMenuContext } from "context/DocumentosMenuContext";
import { getFlattenData } from "utils/getFlattenData";

interface Props {
	searchQuery: string;
}

export default function DocumentsList({ searchQuery }: Props) {
	const { isPending } = useDeleteDocumento();

	const {
		progresion: { progresionesSelected },
		equipo: { equiposSelected },
		funcion: { funcionesSelected },
		vence: { vence },
		tiempo: { tiempoDesde, tiempoHasta },
	} = useDocumentosMenuContext();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useDocuments({
		equipos: equiposSelected,
		vence,
		progresiones: progresionesSelected,
		funciones: funcionesSelected,
		searchQuery,
		tiempoDesde,
		tiempoHasta,
	});

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
					renderItem={({ item }: { item: Documento }) => (
						<DocumentoItem item={item} />
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

			<ModalDeleteDocumento />
		</>
	);
}
