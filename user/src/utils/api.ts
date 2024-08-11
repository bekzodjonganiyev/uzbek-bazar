import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

// export const API_URL = import.meta.env.PROD
//   ? import.meta.env.VITE_PRODUCTION_API_URL
//   : import.meta.env.VITE_STAGING_API_URL; // 'development' and 'staging' mode both makes requests to staging API

export const API_URL = "https://api.uzbekbazar.uz/api/v1/web"

export const http = (withToken?: boolean) => axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ withToken ? localStorage.getItem("token") : ""}`,
  },
});

export function useFetch<T, A>(
  key: (string | number | null | undefined)[],
  url: string,
  withToken: boolean,
  enb?: boolean
) {
  const obj = useQuery<T, A>({
    queryKey: key,
    queryFn: () => http(withToken).get(url),
    enabled: enb,
  });

  return obj;
}

export function usePost(
  method: "post" | "patch" | "delete" | "put",
  onSuccessFn?: (data: AxiosResponse) => void,
  onErrorFn?: (data: AxiosError) => void,
  withToken?: boolean,
) {
  const mutate = useMutation({
    mutationFn: (variables: { url: string; data: any }) =>
      http(withToken)[`${method}`](variables.url, variables.data),
    onSuccess: (data) => (onSuccessFn ? onSuccessFn(data) : null),
    onError: (data: AxiosError) => (onErrorFn ? onErrorFn(data) : null),
  });
  return mutate;
}

