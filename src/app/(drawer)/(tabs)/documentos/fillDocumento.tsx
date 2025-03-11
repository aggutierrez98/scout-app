import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { CustomDropDown } from "components/layout/SelectInput";
import { useDocumentsData, useFillDocumento } from "hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackBarContext } from "context/SnackBarContext";
import { FillDocumentoSchema } from "validators/documento";
import { DocumentFillingFields } from "components/documentos/DocumentFillingFields";
import { useState } from "react";
import { PdfPage } from "components/documentos/PdfPage";

type FillFormValues = {
    scoutId: string;
    documentoId: string;
    familiarId?: string;
    fechaPresentacion?: Date;
    signature?: string;
    documentoFilled?: string;
    rangoDistanciaPermiso?: string,
    cicloActividades?: string,
    lugarEvento?: string,
    fechaEventoComienzo?: Date,
    fechaEventoFin?: Date,
    retiraSolo?: boolean
    retiraPersonas?: string[]
    aclaraciones?: string
};

export default function FillDocumento() {

    const [filePdf, setFilePdf] = useState<string>("");
    const theme = useTheme();
    const { toogleSnackBar } = useSnackBarContext();
    const formMethods = useForm<FillFormValues>({
        mode: "onChange",
        resolver: zodResolver(FillDocumentoSchema),
        defaultValues: {
            retiraPersonas: undefined
        }
    });
    const { mutateAsync: mutateAsyncFill, isPending: isPendingFill } = useFillDocumento(formMethods.setError)
    const { data: documentosData } = useDocumentsData();
    const documentosList =
        documentosData?.filter(documento => documento.completable)?.map((documento) => ({
            label: documento.nombre,
            value: documento.id,
        })) || [];
    const documentoId = formMethods.watch("documentoId")
    const documentSelected = documentosList.find(doc => doc.value === documentoId)

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
            <FormProvider {...formMethods}>
                {isPendingFill && <LoadingScreen />}

                <PdfPage pdfBase64={filePdf} setPdfBase64={setFilePdf} />

                {!filePdf &&
                    <ScrollView
                        style={[
                            {
                                flex: 1,
                                padding: 10,
                            },
                        ]}
                    >

                        <Text
                            variant="titleLarge"
                            style={{ marginTop: -5 }}
                        >
                            Llenar y cargar documento
                        </Text>

                        <CustomDropDown
                            name="documentoId"
                            label="Documento a presentar"
                            list={documentosList}
                            dropDownContainerStyle={{ marginBottom: 0, marginTop: 20 }}
                        />

                        {documentSelected &&
                            <DocumentFillingFields document={{ name: documentSelected?.label, id: documentSelected?.label }} />
                        }

                        <Button
                            mode="contained"
                            icon="file-document-edit-outline"
                            contentStyle={{
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            style={{ marginTop: 10 }}
                            onPress={
                                formMethods.handleSubmit(async (data) => {
                                    const resp = await mutateAsyncFill(data);
                                    if (resp) {
                                        const base64PDF: string = resp.data.data
                                        setFilePdf(base64PDF)
                                    }
                                    else toogleSnackBar("Error al completar documento", "error");
                                })
                            }
                            labelStyle={{
                                fontSize: 17,
                                fontWeight: "bold",
                            }}
                        >
                            Llenar documento
                        </Button>

                    </ScrollView>
                }
                <StatusBar style="auto" />
            </FormProvider>
        </SafeAreaView>
    );
}
