import { useEffect, useState } from "react"
import LoginComponent from "../components/LoginComponent"
import OwnerPropertyComponent from "../components/OwnerPropertiesListComponent";
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Home = () => {
    // user context variables
    const { addUser, user } = UserContext()

    //loading variable 
    const [isLoading, setIsLoading] = useState(true);

    //persist data using useEffect
    useEffect(() => {
        const ownerId = localStorage.getItem('ownerId');
        const tenantId = localStorage.getItem('tenantId');

        if (ownerId) {
            addUser({ ownerId });
        } else if (tenantId) {
            addUser({ tenantId });
        }

        // Set loading to false after checking
        setIsLoading(false); 
    }, []);

    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [userTypeChecked, setUserTypeChecked] = useState(false);

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
                    setUserTypeChecked(false)
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

    // display none when loading variable is true
    if (isLoading) {
        return <div></div>; 
    }

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