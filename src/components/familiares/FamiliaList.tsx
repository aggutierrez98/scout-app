import { ScrollView, View } from "react-native";
import {
  Appbar,
  Badge,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  MD3Colors,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEditContext } from "context/EditContext";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { F_RELATIONSHIPS, M_RELATIONSHIPS } from "utils/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useSnackBarContext } from "context/SnackBarContext";
import { useRelateFamiliar, useUnrelateFamiliar } from "client/familiar";
import { EditFamiliarSchema, RelateFamiliarSchema } from "validators/familiar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScoutWithRelation } from "types/interfaces/familiar";
import { useState } from "react";
import { useAllScouts } from "client/scouts";
import { useMenuContext } from "context/MenuContext";

type FamiliarParams = {
  familiar: string;
};

type FormValues = {
  scoutId: string;
  relacion: string;
};

interface Props {
  familiarId: string;
  scoutsData: ScoutWithRelation[];
  sexo: string;
}

export default function FamiliaList({ scoutsData, sexo, familiarId }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { isEditing } = useEditContext();
  const { data: users } = useAllScouts();
  const { mutateAsync: relate, isPending: relatePending } = useRelateFamiliar();
  const { mutateAsync: unrelate, isPending: unrelatePending } =
    useUnrelateFamiliar();
  const { toogleSnackBar } = useSnackBarContext();
  const [dialogUnrelateVisible, setDialogUnrelate] = useState(false);
  const showDialogUnrelate = () => setDialogUnrelate(true);
  const hideDialogUnrelate = () => setDialogUnrelate(false);
  const [dialogRelateVisible, setDialogRelate] = useState(false);
  const showDialogRelate = () => setDialogRelate(true);
  const hideDialogRelate = () => setDialogRelate(false);
  const [scoutId, setScoutId] = useState("");
  const { relacionesFList, relacionesMList } = useMenuContext();

  const scoutsList =
    users?.map(({ id, nombre }) => ({
      label: nombre,
      value: id,
    })) || [];

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(RelateFamiliarSchema),
  });

  return (
    <>
      {(unrelatePending || relatePending) && <LoadingScreen />}

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
              style={{ marginRight: 10, paddingHorizontal: 5 }}
            >{`${scoutsData?.length} familiares`}</Badge>
            <Icon
              color={theme.colors.primary}
              size={30}
              name="chevron-down"
            ></Icon>
          </View>
        )}
      >
        {scoutsData?.map((scout) => (
          <View
            key={scout.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableRipple
              onPress={() => {
                router.push(`/(drawer)/(tabs)/scouts/${scout.id}`);
              }}
              rippleColor="rgba(0, 0, 0, .12)"
            >
              <List.Item
                left={() => (
                  <Icon
                    name={scout.sexo === "M" ? "human-male" : "human-female"}
                    color={
                      scout.sexo === "F"
                        ? MD3Colors.tertiary70
                        : MD3Colors.primary70
                    }
                    size={25}
                  />
                )}
                right={() => (
                  <Text style={{ marginLeft: 15 }} variant="titleMedium">
                    {scout.relacion}
                  </Text>
                )}
                title={`${scout.nombre} ${scout.apellido}`}
              />
            </TouchableRipple>
            {isEditing && (
              <IconButton
                icon="cancel"
                size={20}
                onPress={() => {
                  setScoutId(scout.id);
                  showDialogUnrelate();
                }}
              />
            )}
          </View>
        ))}

        {isEditing && (
          <TouchableRipple>
            <Button
              icon="plus"
              mode="outlined"
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
              }}
              onPress={() => {
                showDialogRelate();
              }}
            >
              Agregar familiar
            </Button>
          </TouchableRipple>
        )}
      </List.Accordion>

      <Portal>
        <Dialog visible={dialogUnrelateVisible} onDismiss={hideDialogUnrelate}>
          <Dialog.Title>Desasignar scout como familiar</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Este scout dejara de ser familiar ¿Esta seguro?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              textColor="red"
              onPress={async () => {
                hideDialogUnrelate();
                const resp = await unrelate({
                  familiarId,
                  data: { scoutId: scoutId },
                });
                if (resp)
                  toogleSnackBar(
                    "Exito desasignar scout como familiar",
                    "success"
                  );
                else
                  toogleSnackBar(
                    "Error al desasignar scout como familiar",
                    "error"
                  );
              }}
            >
              Confirmar
            </Button>
            <Button onPress={hideDialogUnrelate}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={dialogRelateVisible} onDismiss={hideDialogRelate}>
          <Dialog.Title>Relacionar scout como familiar</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
              Elegir scout para relacionar como familiar y la relacion del
              propio con este.
            </Text>
            <View>
              <FormProvider {...formMethods}>
                <CustomDropDown
                  dropDownContainerStyle={{ marginBottom: 0 }}
                  name="scoutId"
                  label="Scout"
                  list={scoutsList}
                />
                <CustomDropDown
                  name="relacion"
                  label="Relacion"
                  list={sexo === "M" ? relacionesMList : relacionesFList}
                />
              </FormProvider>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              textColor="red"
              onPress={formMethods.handleSubmit(async (data) => {
                Object.keys(data).forEach((key) => {
                  if (data[key as keyof FormValues] === "") {
                    (data[key as keyof FormValues] as unknown) = null;
                  }
                });
                hideDialogRelate();
                const resp = await relate({
                  familiarId,
                  data: { scoutId: data.scoutId, relacion: data.relacion },
                });
                if (resp)
                  toogleSnackBar(
                    "Exito asignar scout como familiar",
                    "success"
                  );
                else
                  toogleSnackBar(
                    "Error al asignar scout como familiar",
                    "error"
                  );
              })}
            >
              Confirmar
            </Button>
            <Button onPress={hideDialogRelate}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
