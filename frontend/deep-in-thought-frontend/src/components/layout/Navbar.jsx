import { Link, useNavigate } from "react-router-dom";
import api from "../../utilities/axiosConfig";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Divider } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { deleteUser, user } = UserContext();
  const [tenantInfo, setTenatInfo] = useState([])

  const onClickLogout = () => {
    //clear localStorage
    localStorage.clear();
    setTenatInfo([])
    //empty user state variable
    deleteUser();
    //navigate to home page
    navigate("/");
  };

  useEffect(() => {
    const getTenantInfo = async () => {
      try {
        let response = await api.get(`tenant/${user[0].tenantId}`);
        setTenatInfo(response.data);
        // so now amount_paid and rent_due are in existingPayments
        // order the data by date_paid??
      } catch (error) {
        console.log(error);
      }
    }
    getTenantInfo()
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
              {tenantInfo.firstName} {tenantInfo.lastName}
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
