import { useState } from "react"
import SignupComponent from "../components/SignupComponent"
import authService from "../utilities/authService"
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    const [userSingupInfo, setUserSingupInfo] = useState({
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        phoneNumber:""
    })

    const registerRequest = async () => {
        try {
            const response = await authService.ownerSignup(userSingupInfo)
            console.log(response)
            if (response.status == 201){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred during registration. Fix your shit')
        }
    }

    return (
        <SignupComponent userSingupInfo={userSingupInfo} setUserSingupInfo={setUserSingupInfo} registerRequest={registerRequest} />
    )
}
export default Signup