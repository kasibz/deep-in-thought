import { useState } from "react"
import LoginComponent from "../components/LoginComponent"
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Home = () => {
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [userTypeChecked, setUserTypeChecked] = useState(false);
    console.log(userTypeChecked)
    console.log(userLoginInfo)
    return (
        <LoginComponent userLoginInfo={userLoginInfo} 
        setUserLoginInfo={setUserLoginInfo} 
        setUserTypeChecked={setUserTypeChecked}
        />
    )
}

export default Home