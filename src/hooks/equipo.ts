import { useQuery } from "@tanstack/react-query";
import { fetchEquipos } from "client/equipo";

export const useEquipos = () =>
  useQuery({
    queryKey: ["equipos"],
    queryFn: fetchEquipos,
  });
