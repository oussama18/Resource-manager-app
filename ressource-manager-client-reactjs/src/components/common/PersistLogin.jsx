import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AuthenticationService from "../../auth/services/auth-service";

const PersistLogin = () => {

    const [isLoading,setIsLoading] = useState(true);
    const {auth,setAuth} = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            const authData = AuthenticationService.isAuthenticated();

            const tokenData = JSON.parse(authData.currentUserData).access_token

            const authResponseData = JSON.parse(window.atob(tokenData.split('.')[1]));
                        
            let user = authResponseData?.sub;
            let accessToken = tokenData;
            let roles = authResponseData?.roles;

            setAuth({user,roles,accessToken});
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    },[]);

    return(
        <>
            <Outlet />
        </>
    );

}

export default PersistLogin;