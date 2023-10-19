import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type Props = {
    children: ReactNode
}

export const PrivateRoute = (props: Props) => {
  const token = localStorage.getItem("token")

  if (!token) return <Navigate to={"/auth/login"} replace />
  return props.children
}