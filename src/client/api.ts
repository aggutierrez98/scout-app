import axios from "axios";
import Constants from "expo-constants";

const localDevApiUrl = `http://${Constants?.expoGoConfig?.debuggerHost?.split(":").shift() ?? "localhost"}:8080/api`
//@ts-ignore
const apiUrl = __DEV__ ? localDevApiUrl : process.env.EXPO_PUBLIC_API_URL;

export default axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

});
