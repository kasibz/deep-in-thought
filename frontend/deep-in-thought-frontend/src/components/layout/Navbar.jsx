import { Link, useNavigate } from "react-router-dom";
import api from "../../utilities/axiosConfig";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Divider } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
import ownerService from "../../utilities/ownerService";

export const Navbar = () => {
  const navigate = useNavigate();
  const { deleteUser, user } = UserContext();
  const [userInfo, setUserInfo] = useState([])
  console.log(user)
  const onClickLogout = () => {
    //clear localStorage
    localStorage.clear();
    setUserInfo([])
    //empty user state variable
    deleteUser();
    //navigate to home page
    navigate("/");
  };

  useEffect(() => {
    // check whether user array is not empty, then
    if (user && user.length > 0) {
      // check attempt to access properties
      if (user[0].hasOwnProperty('tenantId')) {
        const getTenantInfo = async () => {
          try {
            let response = await api.get(`tenant/${user[0].tenantId}`);
            setUserInfo(response.data)
          } catch (error) {
            console.error("Error fetching tenant data:", error);
          }
        };
        getTenantInfo();
      } else if (user[0].hasOwnProperty('ownerId')) {
        const getOwnerInfo = async () => {
          try {
            let response = await ownerService.getOwnerById(user[0].ownerId);
            setUserInfo(response.data);
          } catch (error) {
            console.error("Error fetching owner data:", error);
          }
        };
        getOwnerInfo();
      }
    } else {
      console.log("User array is empty or not loaded yet");
    }
  }, [user]);
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1F4172" }}>
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Deep in Thought
        </Button>
        {/* divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, height: 25, my: "auto", backgroundColor: "white" }}
        />
        {/*check user has at least one element and then access user.tenantId*/}
        {user.length > 0 && user[0].ownerId && (
          <>
            <Button component={Link} to="/createResident" color="inherit">
              Create Resident Account
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, height: 25, my: "auto", backgroundColor: "white" }}
            />
            <Button component={Link} to="/financialStatements" color="inherit">
              Financial Statements
            </Button>
          </>
        )}
        {user.length > 0 && user[0].tenantId && (
          <>
            <Button component={Link} to="/tenantPayment" color="inherit">
              Payment History
            </Button>
          </>
        )}
        <Box style={{ flexGrow: 1 }}></Box> {/* Spacer */}
        {user.length !== 0 && (
          <>
            <Button component={Link} to="/editAccount" color="inherit">
              {userInfo.firstName} {userInfo.lastName}
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, height: 25, my: "auto", backgroundColor: "white" }}
            />
            <Button color="inherit" onClick={onClickLogout}>
              Logout
            </Button>
          </>
        )}
        { }
      </Toolbar>
    </AppBar>
  );
};
