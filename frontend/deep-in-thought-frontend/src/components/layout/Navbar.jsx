import { Link, useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";

export const Navbar = () => {
    const navigate = useNavigate()
    const { deleteUser, user } = UserContext()

    const onClickLogout = () => {
        //clear localStorage
        localStorage.clear()
        //empty user state variable
        deleteUser()
        //navigate to home page
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button component={Link} to="/" color="inherit">
                    Deep in Thought
                </Button>
                {/*check user has at least one element and then access user.tenantId*/}
                {user.length > 0 && user[0].tenantId &&
                    <Button component={Link} to="/tenantPayment" color="inherit">
                        Payment History
                    </Button>
                }


                <Box style={{ flexGrow: 1 }}></Box> {/* Spacer */}
{/*                                <Button component={Link} to="resetPassword" color="inherit"> */}
{/*                                                     Reset Password */}
{/*                                                 </Button> */}
                {user.length !== 0 &&
                <>
                <Button component={Link} to="resetPassword" color="inherit">
                                                                                                        Reset Password
                                                                                                    </Button>
                                    <Button color="inherit" onClick={onClickLogout}>
                                        Logout
                                    </Button>
                </>
                }
            </Toolbar>
        </AppBar>
    );
}