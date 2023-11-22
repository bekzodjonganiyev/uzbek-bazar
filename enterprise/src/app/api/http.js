import axios from "axios";

const token = localStorage.getItem("token")

export const http = (withToken) => axios.create({
    baseURL: "https://uzbazar.husanibragimov.uz/api/v1/web",
    headers: {
        Authorization: withToken ? `Bearer ${token}` : ""
    },
})