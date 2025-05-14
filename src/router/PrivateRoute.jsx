import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
    const { logged } = useContext( AuthContext );

  return (logged) 
    ? children
    : <Navigate to="/login"/>
}