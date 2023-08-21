import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL =
  import.meta.env.APP_MODE === "production"
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_STAGING_API_URL; // 'development' and 'staging' mode both makes requests to staging API

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export function useFetch<T, A>(key: (string | number)[], url: string) {
  const obj = useQuery<T, A>({
    queryKey: key,
    queryFn: () => http.get(url),
  });
  
  return obj
}
