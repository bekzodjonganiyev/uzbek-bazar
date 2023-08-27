import { ReactNode } from 'react'

type Props = {
    loading: boolean
    error: null | boolean | string
    loadingFallback: ReactNode
    errorFallback: ReactNode
    children: ReactNode
}

export const CustomSuspanse = (props: Props) => {
    if (props.loading) return props.loadingFallback
    if (props.error) return props.errorFallback
    return props.children
}