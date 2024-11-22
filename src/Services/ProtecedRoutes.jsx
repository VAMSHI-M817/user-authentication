import { Navigate, Outlet } from "react-router"

const ProtecedRoutes = () => {
    const isAuthenticated = localStorage.getItem("isLoggedIn")
    return isAuthenticated ? <Outlet /> : <Navigate to={"/"} /> 
}

export default ProtecedRoutes
