import {Navigate, Outlet } from 'react-router-dom'

const useAuth = () =>{
    const user = {loggedIn: false}
    return user && user.loggedIn
}

const  ProtectRoute = (props) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={'/'} />
}

export default ProtectRoute