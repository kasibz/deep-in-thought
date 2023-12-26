import { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import OwnerPropertyComponent from "../components/OwnerPropertiesListComponent";
import authService from "../utilities/authService";
import { UserContext } from "../context/UserContext";
import { CircularProgress } from "@mui/material";
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Tenant from "./Tenant";

const Home = () => {
  // user context variables
  const { addUser, user } = UserContext();

  //loading variable
  const [isLoading, setIsLoading] = useState(true);
  const [userUpdateResult, setUserUpdateResult] = useState({
    success: false,
    failure: false,
  });

  //persist data using useEffect
  useEffect(() => {
    const ownerId = localStorage.getItem("ownerId");
    const tenantId = localStorage.getItem("tenantId");

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
    password: "",
  });

  const [userTypeChecked, setUserTypeChecked] = useState(false);

  const loginRequest = async () => {
    if (userTypeChecked) {
      try {
        const response = await authService.ownerLogin(userLoginInfo);
        if (response.status == 200) {
          addUser({
            ownerId: response.data.ownerId,
          });
          localStorage.setItem("ownerId", response.data.ownerId);
          localStorage.removeItem("tenantId");
          setUserUpdateResult({
            failure: false,
            success: true,
          });
          setUserTypeChecked(false);
        }
      } catch (error) {
        setUserUpdateResult({
          failure: true,
          success: false,
        });
        console.log(error);
      }
    } else {
      try {
        const response = await authService.tenantLogin(userLoginInfo);
        console.log(response);
        if (response.status == 200) {
          addUser({
            tenantId: response.data.tenantId,
          });
          localStorage.setItem("tenantId", response.data.tenantId);
          localStorage.removeItem("ownerId");
          setUserUpdateResult({
            failure: false,
            success: true,
          });
        }
      } catch (error) {
        setUserUpdateResult({
          failure: true,
          success: false,
        });
        console.log(error);
      }
    }
  };

  // display none when loading variable is true
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {user.length === 0 ? (
        <LoginComponent
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          setUserTypeChecked={setUserTypeChecked}
          loginRequest={loginRequest}
          setUserUpdateResult={setUserUpdateResult}
          userUpdateResult={userUpdateResult}
        />
      ) : user[0].ownerId ? (
        <OwnerPropertyComponent />
      ) : (
        <Tenant />
      )}
    </>
  );
};

export default Home;
