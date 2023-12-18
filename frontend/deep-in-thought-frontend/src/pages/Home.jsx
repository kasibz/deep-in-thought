import { useState } from "react"
import LoginComponent from "../components/LoginComponent"
import OwnerPropertyComponent from "../components/OwnerPropertiesListComponent";
import authService from "../utilities/authService";
import { UserContext } from "../context/UserContext";
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Tenant from './Tenant';

const Home = () => {
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    })

    const [userTypeChecked, setUserTypeChecked] = useState(false);

    // user context variables
    const { addUser, user } = UserContext()

    const loginRequest = async () => {
        if (userTypeChecked) {
            try {
                const response = await authService.ownerLogin(userLoginInfo)
                console.log(response)
                if (response.status == 200) {
                    addUser({
                        ownerId: response.data.ownerId
                    });
                    localStorage.setItem('ownerId', response.data.ownerId)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await authService.tenantLogin(userLoginInfo)
                console.log(response)
                if (response.status == 200) {
                    addUser({
                        tenantId: response.data.tenantId
                    });
                    localStorage.setItem('tenantId', response.data.tenantId)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    console.log(user)
    return (
        <>
            {user.length === 0 ? 
                <LoginComponent 
                    userLoginInfo={userLoginInfo}
                    setUserLoginInfo={setUserLoginInfo}
                    setUserTypeChecked={setUserTypeChecked}
                    loginRequest={loginRequest}
                />
                : user[0].ownerId
                    ? <OwnerPropertyComponent />
                    : <Tenant />
            }
        </>
    );
    
    
}

export default Home