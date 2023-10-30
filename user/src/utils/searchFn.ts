import { http } from "@/utils/api"

export const seacrFc = async (url: string, key: string, value: string, setState: (args: any) => void) => {
    try {
        setState({ loading: true })
        const res = await http().get(`${url}/?${key}=${value}`)
        setState({ loading: false, data: res.data?.results, error: "" })
    } catch (error: any) {
        setState({ loading: false, data: [], error: error.message })
        return new Error("Server error")
    }
}