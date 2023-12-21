import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { deleteUser, user } = UserContext();

  const onClickLogout = () => {
    //clear localStorage
    localStorage.clear();
    //empty user state variable
    deleteUser();
    //navigate to home page
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Deep in Thought
        </Button>
        {/*check user has at least one element and then access user.tenantId*/}
        {user.length > 0 && user[0].tenantId && (
          <Button component={Link} to="/tenantPayment" color="inherit">
            Payment History
          </Button>
        )}
        {user.length > 0 && user[0].ownerId && (
          <Button component={Link} to="/createResident" color="inherit">
            Create Resident
          </Button>
        )}
        <Box style={{ flexGrow: 1 }}></Box> {/* Spacer */}
        {user[0] && (
          <Button component={Link} to="/editAccount" color="inherit">
            Edit Account
          </Button>
        )}
        {user.length !== 0 && (
          <Button color="inherit" onClick={onClickLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
