import axios from "axios";
import Constants from "expo-constants";
import { API_URL } from "@env";
const constants = Constants;

const apiUrl = __DEV__
  ? `http://${
      constants?.expoGoConfig?.debuggerHost?.split(":").shift() ?? "localhost"
    }:8080/api`
  : API_URL;

export default axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});