import { useState } from "react"
import SignupComponent from "../components/SignupComponent"

const Signup = () => {
    const [userSingupInfo, setUserSingupInfo] = useState({
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        phoneNumber:""
    })
    console.log(userSingupInfo)
    return (
        <SignupComponent userSingupInfo={userSingupInfo} setUserSingupInfo={setUserSingupInfo} />
    )
}
export default Signup