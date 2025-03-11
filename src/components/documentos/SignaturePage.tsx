import { useTheme } from 'react-native-paper';
import Signature from 'react-native-signature-canvas';

interface Props {
    handleSignature: (arg: string) => Promise<void> | void
}
export const SignaturePage = ({ handleSignature }: Props) => {
    const { colors, roundness } = useTheme()


    const style = `
        body,html {
            height: calc(100% - 30px);
            font-family: "notoserif";
            font-weight: bold;
        }
        .m-signature-pad {
            box-shadow: none;
            border: none;
            height: 100%;
            background-color: ${colors.surface};
        }
        .m-signature-pad--body {
            border: none;
            position: relative;
        }
        .m-signature-pad--footer {
            width: 100%;
            position: absolute;
            background-color: ${colors.surface};
            bottom: 0;
            padding: 30px;
            .description {
                color: ${colors.onSurfaceVariant};
                text-align: center;
                font-size: 1.5em;
            }

            .button {
                background-color: ${colors.onSurfaceVariant};
                width: 100px;
                border-radius: ${roundness}%,
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: ${colors.surface};
                border: none;
                outline: none;
            }
        }
    `

    return (
        <Signature
            webStyle={style}
            bgHeight={700}
            onOK={async (sig) => {
                await handleSignature(sig)
            }}
            onEmpty={() => console.log('___onEmpty')}
            descriptionText="Firma"
            clearText="Limpiar"
            confirmText="Guardar"
            minWidth={1}
            backgroundColor={colors.surface}
            penColor={colors.onPrimary}
        />
    )
}
