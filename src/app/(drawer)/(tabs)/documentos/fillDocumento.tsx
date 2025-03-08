import { Button, HelperText, Text, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { useDocumento, useDocumentsData, useFillDocumento, useGetMe } from "hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackBarContext } from "context/SnackBarContext";
import { FillDocumentoSchema } from "validators/documento";
import { SignaturePage } from "components/documentos/SignaturePage";
import { useSignature } from "hooks/useSignature";
import { DocumentFillingFields } from "components/documentos/DocumentFillingFields";
import { useEffect, useState } from "react";

type FormValues = {
    scoutId: string;
    documentoId: string;
    familiarId: string;
    fechaPresentacion: Date;
    signature: string;
    rangoDistanciaPermiso: string,
    cicloActividades: string,
    lugarEvento: string,
    fechaEventoComienzo: Date,
    fechaEventoFin: Date,
    retiraSolo: boolean
    retiraPersonas: string[]
    aclaraciones: string
};

export default function FillDocumento() {
    const { getSignature, signatureBase64, getSignaturePad, handleSignature } = useSignature()

    const theme = useTheme();
    const { toogleSnackBar } = useSnackBarContext();
    const formMethods = useForm<FormValues>({
        mode: "onChange",
        resolver: zodResolver(FillDocumentoSchema),
    });
    const { isSuccess, mutateAsync, isPending } = useFillDocumento(formMethods.setError)
    const { data: documentosData } = useDocumentsData();
    const documentosList =
        documentosData?.filter(documento => documento.completable)?.map((documento) => ({
            label: documento.nombre,
            value: documento.id,
        })) || [];

    const documentoId = formMethods.watch("documentoId")
    const documentSelected = documentosList.find(doc => doc.value === documentoId)
    const requiereFirma = documentosData?.find(doc => doc.id === documentoId)?.requiereFirma

    useEffect(() => {
        if (signatureBase64) formMethods.setValue("signature", signatureBase64)
        return () => { formMethods.setValue("signature", "") }
    }, [signatureBase64])

    if (isSuccess) return <Redirect href="/(drawer)/documentos" />;

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                    padding: 10,
                    backgroundColor: theme.colors.background,
                },
            ]}
        >
            {getSignaturePad
                ? <SignaturePage handleSignature={handleSignature} />
                :
                <ScrollView
                    style={[
                        {
                            flex: 1,
                            padding: 10,
                        },
                    ]}
                >
                    {isPending && <LoadingScreen />}

                    <Text
                        variant="titleLarge"
                        style={{ marginTop: -5 }}
                    >
                        Llenar y cargar documento
                    </Text>

                    <FormProvider {...formMethods}>

                        <CustomDropDown
                            name="documentoId"
                            label="Documento a presentar"
                            list={documentosList}
                            dropDownContainerStyle={{ marginBottom: 0, marginTop: 20 }}
                        />

                        {documentSelected &&
                            <DocumentFillingFields document={{ name: documentSelected?.label, id: documentSelected?.label }} />
                        }

                        {/* TODO: VOLVER A AGREGAR FECHA DE PRESENTACION (VALIDAR ENREALIDAD SI ES NECESARIO) */}
                        {/* <CustomDatePicker
                                name="fechaPresentacion"
                                label="Fecha de entrega del documento"
                        /> */}

                        {requiereFirma &&
                            <Button
                                mode="outlined"
                                icon="file-sign"
                                contentStyle={{
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                style={{ marginTop: 5 }}
                                onPress={() => {
                                    getSignature()
                                }}
                                disabled={!!signatureBase64}
                                labelStyle={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                }}
                            >
                                {signatureBase64 ? "Documento firmado" : "Firmar documento"}
                            </Button>
                        }

                        <HelperText type="error" visible={!!formMethods.formState.errors.signature}>
                            {formMethods.formState.errors.signature?.message?.toString()}
                        </HelperText>

                        <Button
                            mode="contained"
                            icon="send"
                            contentStyle={{
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            style={{ marginTop: 10 }}
                            onPress={formMethods.handleSubmit(async (data) => {
                                const resp = await mutateAsync(data);
                                if (resp) toogleSnackBar("Documento completado con exito!", "success");
                                else toogleSnackBar("Error al completar documento", "error");
                            })}
                            labelStyle={{
                                fontSize: 17,
                                fontWeight: "bold",
                            }}
                        >
                            Guadar datos
                        </Button>
                    </FormProvider>

                </ScrollView>

            }
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
