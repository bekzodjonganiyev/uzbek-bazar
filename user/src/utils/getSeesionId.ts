import { AxiosError, AxiosResponse } from "axios";
import { useFetch } from "./api";

let machineId = localStorage.getItem("MachineId");

if (!machineId) {
  machineId = crypto.randomUUID();
  localStorage.setItem("MachineId", machineId);
}

export function getMachineId() {
  const { data, isSuccess, isError, isLoading } = useFetch<AxiosResponse, AxiosError>(["user-profile-data"], "/clients/profile/", true, true)

  return { isLoading, isSuccess, isError, userData: data, machineId }
}
