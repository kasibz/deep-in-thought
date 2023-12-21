import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
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
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(updatedUser);
      // user Updated!
    } catch (error) {
      console.error("error found", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  // take in data from the current tenant and do a request on their properties
  return (
    <div>
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
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={handleChange}
                name="phoneNumber"
                value={updatedUser.phoneNumber}
              />
            </p>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </>
      ) : (
        <p>Tenant Data Loading...</p>
      )}
    </div>
  );
}

export default UserAccountComponent;
