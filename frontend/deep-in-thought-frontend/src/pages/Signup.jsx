import { useState } from "react"
import SignupComponent from "../components/SignupComponent"
import authService from "../utilities/authService"
import { useNavigate } from 'react-router-dom';
import SuccessSnackBar from './../components/snackbar/SuccessSnackBar';

const Signup = () => {

    const navigate = useNavigate()

    const [userSingupInfo, setUserSingupInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: ""
    })
    //loading variable 
    const [isLoading, setIsLoading] = useState(false);

    //snack bar state variables
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    //snack bar on close function
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const registerRequest = async () => {
        setIsLoading(true)
        try {
            const response = await authService.ownerSignup(userSingupInfo)
            if (response.status == 201) {
                //snack bar message
                setSnackbarMessage('Successfully created owner`s account');
                //set true to open snack bar
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
        } catch (error) {
            console.log(error)
            alert('An error occurred during registration. Please try it again')

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <SignupComponent 
                userSingupInfo={userSingupInfo} 
                setUserSingupInfo={setUserSingupInfo} 
                registerRequest={registerRequest}
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
            />
            <SuccessSnackBar
                open={snackbarOpen}
                message={snackbarMessage}
                handleClose={handleCloseSnackbar}
            />
        </>
    )
}
export default Signup