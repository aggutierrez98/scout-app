import {
    Snackbar,
    useTheme,
} from "react-native-paper";
import { useSnackBarContext } from "context/SnackBarContext";

export const SnackBarWrapper = () => {
    const { snackBarText, snackBarMode, visibleSnack, onDismissSnackBar } = useSnackBarContext();
    const { colors } = useTheme();

    return (
        <Snackbar
            visible={visibleSnack}
            rippleColor={colors.onPrimary}
            onDismiss={onDismissSnackBar}
            duration={2000}
            elevation={1}
            style={{
                borderColor:
                    snackBarMode === "error"
                        ? colors.onError
                        : colors.onTertiary,
                borderWidth: 1,
                marginBottom: 15,
            }}
            action={{
                label: "Cerrar",
                textColor:
                    snackBarMode === "error"
                        ? colors.onError
                        : colors.onTertiary,
                onPress: () => {
                    onDismissSnackBar();
                },
            }}
        >
            {snackBarText}
        </Snackbar>
    )
}
