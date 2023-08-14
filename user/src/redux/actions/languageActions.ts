import { ActionTypes } from '@/redux/contants/action-types'

export const setLanguage = (language: string) => {
    return {
        type: ActionTypes.SET_LANGUAGE,
        payload: language
    }
}