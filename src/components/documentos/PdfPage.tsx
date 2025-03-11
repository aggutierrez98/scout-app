import { View } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import Pdf from "react-native-pdf"
import { ModalConfirmation } from "./ModalConfirmUpload"
import { useEffect, useState } from "react"
import { SignaturePage } from "./SignaturePage"
import { useSignature } from "hooks/useSignature"
import { useFormContext } from "react-hook-form"
import { useDocumentsData, useSignDocumento, useUploadDocumento } from "hooks"
import { useSnackBarContext } from "context/SnackBarContext"
import * as WebBrowser from 'expo-web-browser';
import { LoadingScreen } from "components/layout/LoadingScreen"
import { Redirect } from "expo-router"

interface Props {
    pdfBase64: string
    setPdfBase64: (arg: string) => void
}

export const PdfPage = ({ pdfBase64, setPdfBase64 }: Props) => {
    const { setError, setValue, watch } = useFormContext()
    const { toogleSnackBar } = useSnackBarContext();
    const [visible, setVisible] = useState(false);
    const hideDialog = () => {
        setVisible(false);
    };
    const { getSignature, getSignaturePad, signatureBase64, handleSignature } = useSignature()
    const { isSuccess: isSuccessSign, mutateAsync: mutateAsyncSign, isPending: isPendingSign } = useSignDocumento(setError)
    const { mutateAsync: mutateAsyncUpload, isPending: isPendingUpload, isSuccess: isSuccessUpload } = useUploadDocumento(setError);
    const { data: documentosData } = useDocumentsData();
    const docId = watch("documentoId")
    const scoutId = watch("scoutId")
    const requiereFirma = documentosData?.find(doc => doc.id === docId)?.requiereFirma

    useEffect(() => {
        if (signatureBase64) {
            mutateAsyncSign({
                documentoId: docId,
                documentoFilled: pdfBase64,
                signature: signatureBase64,
            }).then(resp => {
                if (resp) {
                    const base64PDF: string = resp.data.data
                    setPdfBase64(base64PDF)
                }
                else toogleSnackBar("Error al firmar documento", "error");
            }).catch(error => {
                console.error(error)
                toogleSnackBar("Error al firmar documento", "error");
            })
        }
        return () => { setValue("signature", "") }
    }, [signatureBase64])

    if (isSuccessUpload) return <Redirect href="/(drawer)/documentos" />;
    if (!pdfBase64) return null
    if (getSignaturePad) return <SignaturePage handleSignature={handleSignature} />

    return (
        <View style={{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}>

            {(isPendingSign || isPendingUpload) && <LoadingScreen />}

            <Text
                variant="titleLarge"
                style={{ marginTop: -5, fontSize: 15, fontWeight: "bold" }}
            >
                Vista previa del documento
            </Text>

            <Pdf
                source={{ uri: `data:application/pdf;base64,${pdfBase64}`, cache: true }}
                style={{
                    flex: 1,
                    width: '100%',
                }}
                onLoadProgress={() => <ActivityIndicator size="large" />}
                onError={(error) => console.log(error)}
            />
            {

                requiereFirma && ((!signatureBase64) || !isSuccessSign) ?
                    <Button
                        mode="outlined"
                        icon="file-sign"
                        contentStyle={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            getSignature()
                        }}
                        labelStyle={{
                            fontSize: 15,
                            fontWeight: "bold",
                        }}
                    >
                        Firmar documento
                    </Button>
                    :
                    (!requiereFirma || isSuccessSign) &&
                    <Button
                        mode="contained"
                        icon="send"
                        contentStyle={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            setVisible(true)
                        }
                        }
                        labelStyle={{
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        Guardar documento
                    </Button>

            }

            <ModalConfirmation modalVisible={visible} hideModal={hideDialog} onPressFunction={() => {
                if (pdfBase64) {
                    mutateAsyncUpload({
                        documentoId: docId,
                        scoutId: scoutId,
                        documentoFilled: pdfBase64,
                    }).then(resp => {
                        if (resp) {
                            toogleSnackBar("El documento se cargo y entrego con exito!", "success");
                            if (resp.fileUrl) WebBrowser.openBrowserAsync(resp.fileUrl)
                        }
                        else toogleSnackBar("Error al entregar el documento", "error");
                    })
                }
            }} />
        </View>
    )
}
