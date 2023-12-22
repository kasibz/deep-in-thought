import Button from "@mui/material/Button";
import { TextField, Box, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserAccountComponent({ userData, userType }) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error saving user");
  const [userUpdateResult, setUserUpdateResult] = useState({
    success: false,
    failure: false,
  });
  const [updatedUser, setUpdatedUser] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  });

  const editUser = async (userInfo) => {
    const response = await fetch(
      `http://localhost:8080/${userType}/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    if (response.status === 409) {
      setErrorMessage("User by that email already exists");
      setUserUpdateResult({
        ...userUpdateResult,
        failure: true,
        success: false,
      });
      return;
    }
    setUserUpdateResult({
      ...userUpdateResult,
      success: true,
      failure: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // user Updated!
      setSubmitClicked(true);
      await editUser(updatedUser);
    } catch (error) {
      //  user not Updated
      setUserUpdateResult({
        ...userUpdateResult,
        failure: true,
        success: false,
      });
    }
    setSubmitClicked(false);
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="general-box">
      {userData.firstName ? (
        <>
          {userUpdateResult.success && (
            <Alert severity="success">User updated successfully!</Alert>
          )}
          {userUpdateResult.failure && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          <h2>Edit Account</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic-input"
              size="small"
              label="First Name"
              onChange={handleChange}
              name="firstName"
              value={updatedUser.firstName}
            />
            <p>
              <TextField
                id="outlined-basic-input"
                size="small"
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                value={updatedUser.lastName}
              />
            </p>
            <p>
              <TextField
                id="outlined-basic-input"
                size="small"
                label="Email"
                type="email"
                onChange={handleChange}
                name="email"
                value={updatedUser.email}
              />
            </p>
            <p>
              <TextField
                id="outlined-basic-input"
                size="small"
                label="Phone Number"
                type="tel"
                onChange={handleChange}
                name="phoneNumber"
                value={updatedUser.phoneNumber}
              />
            </p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: 300,
              }}
            >
              {!submitClicked ? (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              ) : (
                <CircularProgress />
              )}
              <Button component={Link} to="/resetPassword" variant="contained">
                Reset Password
              </Button>
            </Box>
          </form>
        </>
      ) : (
        <p>Tenant Data Loading...</p>
      )}
    </div>
  );
}

export default UserAccountComponent;
