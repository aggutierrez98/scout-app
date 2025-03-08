import { View } from "react-native";
import {
    Badge,
    List,
    MD3Colors,
    Text,
    TouchableRipple,
    useTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FamiliarWithRelacion } from "interfaces/familiar";
import { F_RELATIONSHIPS, M_RELATIONSHIPS } from "utils/constants";


interface Props {
    data: FamiliarWithRelacion[]
}

const relacionesMList = M_RELATIONSHIPS.map((relacion) => ({
    label: relacion,
    value: relacion,
}));
const relacionesFList = F_RELATIONSHIPS.map((relacion) => ({
    label: relacion,
    value: relacion,
}));

export default function ScoutFamiliaList({ data }: Props) {
    const theme = useTheme();
    const router = useRouter();

    // const { toogleSnackBar } = useSnackBarContext();

    return (
        <>
            <List.Accordion
                title="Familia"
                left={(props) => <List.Icon {...props} icon="account-child-outline" />}
                right={() => (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Badge
                            size={25}
                            style={{
                                marginRight: 10,
                                paddingHorizontal: 5,
                                backgroundColor: theme.colors.secondary,
                                color: theme.colors.onTertiary,
                            }}
                        >{`${data?.length} familiares`}</Badge>
                        <Icon
                            color={theme.colors.onPrimary}
                            size={30}
                            name="chevron-down"
                        />
                    </View>
                )}
            >
                {data?.map((familiar) => {
                    return (
                        <View
                            key={familiar.id}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginLeft: -20,
                            }}
                        >
                            <TouchableRipple
                                onPress={() => {
                                    router.push(`/(drawer)/familiares/${familiar.id}`);
                                }}
                                rippleColor="rgba(0, 0, 0, .12)"
                            >
                                <List.Item
                                    left={() => (
                                        <Icon
                                            name={familiar.sexo === "M" ? "human-male" : "human-female"}
                                            color={
                                                familiar.sexo === "F"
                                                    ? MD3Colors.tertiary70
                                                    : MD3Colors.primary70
                                            }
                                            size={25}
                                        />
                                    )}
                                    right={() => (
                                        <Text style={{ marginLeft: 15 }} variant="titleMedium">
                                            {familiar.relacion}
                                        </Text>
                                    )}
                                    title={`${familiar.nombre} ${familiar.apellido}`}
                                />
                            </TouchableRipple>
                        </View>
                    )
                })}
            </List.Accordion>
        </>
    );
}
