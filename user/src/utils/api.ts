import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const API_URL =
  import.meta.env.APP_MODE === "production"
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_STAGING_API_URL; // 'development' and 'staging' mode both makes requests to staging API

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export function useFetch<T, A>(
  key: (string | number | null | undefined)[],
  url: string,
  enb?: boolean
) {
  const obj = useQuery<T, A>({
    queryKey: key,
    queryFn: () => http.get(url),
    enabled: enb,
  });

  return obj;
}

// export function useMutate<T, A>(keys: (string | number | null | undefined)[], mutateFn: Promise<any>, data: any) {
//   const obj = useMutation<T, A>({
//     mutationKey: keys,
//     mutationFn: (data) => mutateFn
//   })
//   return obj
// }
