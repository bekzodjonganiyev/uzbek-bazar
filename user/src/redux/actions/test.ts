import { TEST } from '@/redux/contants/test'

export const setId = (id: number) => {
    return {
        type: TEST.ADD,
        payload: id
    }
}

export const deleteId = (id: number) => {
    return {
        type: TEST.DELETE,
        payload: id
    }
}