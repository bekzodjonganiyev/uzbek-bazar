import axios from "axios";

const token = localStorage.getItem("jwt_access_token")
export const baseUrl = "https://api.uzbekbazar.uz/api/v1/web/"

export const http = (withToken) => axios.create({
    baseURL: "https://api.uzbekbazar.uz/api/v1/web/",
    headers: {
        Authorization: withToken ? `Bearer ${token}` : ""
    },
})