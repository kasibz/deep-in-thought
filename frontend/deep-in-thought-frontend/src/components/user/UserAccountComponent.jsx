import Button from "@mui/material/Button";
import { TextField, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserAccountComponent({ userData, userType }) {
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
    const data = await response.json();
    alert(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(updatedUser);
      // user Updated!
    } catch (error) {
      alert("error found", error);
    }
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
              <Button variant="contained" type="submit">
                Submit
              </Button>
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
