import {
  ActivityIndicator,
  Divider,
  List,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import ListItem from "../ListItem";
import { useScouts } from "../../client/scouts";
import { Fragment } from "react";
import { FlatList } from "react-native";
import { Scout } from "types/interfaces/scout";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";

interface Props {
  searchQuery: string;
}

export default function ScoutsList({ searchQuery }: Props) {
  const router = useRouter();

  const {
    sexo: { sexo },
    progresion: { progresionesSelected },
    patrulla: { patrullasSelected },
    funcion: { funcionesSelected },
  } = useMenuContext();

  const { data, isError, fetchNextPage, hasNextPage, isLoading } = useScouts({
    patrullas: patrullasSelected,
    sexo,
    progresiones: progresionesSelected,
    funciones: funcionesSelected,
    searchQuery,
  });

  const flattenData: Scout[] = data?.pages.flatMap((page) => page!) || [];

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <List.Section
      style={{
        marginBottom: 50,
      }}
    >
      <FlatList
        data={flattenData}
        keyExtractor={(scout) => scout.id}
        renderItem={({ item }: { item: Scout }) => (
          <Fragment key={item.id}>
            <ListItem
              title={`${item.apellido} ${item.nombre}`}
              icon={item.sexo === "M" ? "human-male" : "human-female"}
              iconColor={
                item.sexo === "F" ? MD3Colors.tertiary70 : MD3Colors.primary70
              }
              action={() => {
                router.push(`/Scouts/${item.id}`);
              }}
            />
            <Divider />
          </Fragment>
        )}
        onEndReached={loadNextPageData}
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
            <Text variant="titleMedium">No se encontraron resultados</Text>
          </Surface>
        }
      />
    </List.Section>
  );
}
