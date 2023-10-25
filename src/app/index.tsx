import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { Redirect } from "expo-router";

export default function Login() {
  const { isLoading, data: userData } = useRenewLogin();

  // // const queryCache = new QueryCache({
  // //   onError: (error) => {
  // //     console.log(error);
  // //   },
  // //   onSuccess: (data) => {
  // //     console.log(data);
  // //   },
  // //   onSettled: (data, error) => {
  // //     console.log(data, error);
  // //   },
  // // });

  // // const query = queryCache.find({ queryKey: ["user"] });
  // // console.log({ query });

  return (
    <>
      {isLoading && <LoadingScreen />}
      {userData ? (
        <Redirect href="/(drawer)/(tabs)/scouts" />
      ) : (
        <Redirect href="/login" />
      )}
    </>
  );
}
