import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const A = import.meta.env;
console.log(A, "this is url");
const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_API_URL
  : import.meta.env.VITE_STAGING_API_URL; // 'development' and 'staging' mode both makes requests to staging API

// console.log(import.meta.env);
// console.log(import.meta.env.BASE_URL);
// console.log(import.meta.env.VITE_APP_MODE);
// console.log(import.meta.env.VITE_PRODUCTION_API_URL);
// console.log(import.meta.env.VITE_STAGING_API_URL);
// console.log(import.meta.env.PROD); s

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
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

export function usePost(
  method: "post" | "patch" | "delete",
  onSuccessFn?: () => void,
  onErrorFn?: (data: any) => void
) {
  const mutate = useMutation({
    mutationFn: (variables: { url: string; data: any }) =>
      http[`${method}`](variables.url, variables.data),
    onSuccess: () => (onSuccessFn ? onSuccessFn() : null),
    onError: (data) => (onErrorFn ? onErrorFn(data) : null),
  });
  return mutate;
}

// export function useMutate<T, A>(keys: (string | number | null | undefined)[], mutateFn: Promise<any>, data: any) {
//   const obj = useMutation<T, A>({
//     mutationKey: keys,
//     mutationFn: (data) => mutateFn
//   })
//   return obj
// }
