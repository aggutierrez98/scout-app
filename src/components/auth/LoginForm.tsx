import { Dimensions, View } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { useLogin } from "hooks";
import { useState } from "react";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "validators/auth";

type FormValues = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const theme = useTheme();
  const [hidePass, setHidePass] = useState(true);
  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserSchema),
  });
  const { mutate, isPending } = useLogin(formMethods.setError);

  return (
    <>
      {isPending && <LoadingScreen />}
      <View
        style={[
          {
            justifyContent: "center",
            width: Dimensions.get("window").width * 0.9,
            padding: 10,
            paddingTop: 0,
            paddingBottom: 100,
          },
        ]}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          Iniciar sesión
        </Text>
        <Divider style={{ marginVertical: 10 }} />

        <FormProvider {...formMethods}>
          <CustomTextInput
            name="username"
            label="Usuario"
            placeholder="Ingrese nombre de usuario"
            style={{ marginTop: 20 }}
          />
          <CustomTextInput
            name="password"
            label="Contraseña"
            placeholder="Ingrese contraseña"
            hidden
            // secureTextEntry={hidePass ? true : false}
            style={{ marginTop: 10, position: "relative" }}
          />
          {/*
          <Button
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={() => setHidePass(!hidePass)}
          >
            <Icon name={hidePass ? "eye" : "eye-off"} size={20} />
          </Button> */}

          <Button
            mode="contained"
            contentStyle={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ marginTop: 20 }}
            onPress={formMethods.handleSubmit((data) => mutate(data))}
            labelStyle={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Enviar
          </Button>
        </FormProvider>
      </View>
    </>
  );
}
