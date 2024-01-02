import { useState } from "react";
import SignupComponent from "../components/SignupComponent";
import authService from "../utilities/authService";
import { useNavigate } from "react-router-dom";
import SuccessSnackBar from "./../components/snackbar/SuccessSnackBar";

const Signup = () => {
  const navigate = useNavigate();

  const [userSingupInfo, setUserSingupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  //loading variable
  const [isLoading, setIsLoading] = useState(false);

  //snack bar state variables
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [residentRegisterResponse, setResidentRegisterResponse] = useState({
    message: "",
    failure: false,
  });

  //snack bar on close function
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const registerRequest = async () => {
    setIsLoading(true);
    try {
      const response = await authService.ownerSignup(userSingupInfo);
      if (response.status == 201) {
        //snack bar message
        setSnackbarMessage("Successfully created owner`s account");
        //set true to open snack bar
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      error.message?.includes("409")
        ? setResidentRegisterResponse({
            ...residentRegisterResponse,
            message: "User by that email already exists",
            failure: true,
          })
        : setResidentRegisterResponse({
            ...residentRegisterResponse,
            message: error.message,
            failure: true,
          });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SignupComponent
        userSingupInfo={userSingupInfo}
        setUserSingupInfo={setUserSingupInfo}
        registerRequest={registerRequest}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        residentRegisterResponse={residentRegisterResponse}
      />
      <SuccessSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};
export default Signup;
