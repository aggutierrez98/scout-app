import { useQuery } from "@tanstack/react-query";
import { fetchPatrullas } from "client/patrulla";

export const usePatrullas = () =>
  useQuery({
    queryKey: ["patrullas"],
    queryFn: fetchPatrullas,
  });
