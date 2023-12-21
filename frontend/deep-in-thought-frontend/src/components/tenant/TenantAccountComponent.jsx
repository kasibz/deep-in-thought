import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import tenantService from "../../utilities/tenantService";
import { useState } from "react";

function TenantAccountComponent({ tenantData }) {
  const [updatedTenant, setUpdatedTenant] = useState({
    firstName: tenantData.firstName,
    lastName: tenantData.lastName,
    email: tenantData.email,
    phoneNumber: tenantData.phoneNumber,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    tenantService
      .editTenant(tenantData.id, updatedTenant)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error("Error updating tenant", error);
      });
  };

  const handleChange = (e) => {
    setUpdatedTenant({
      ...updatedTenant,
      [e.target.name]: e.target.value,
    });
  };

  // take in data from the current tenant and do a request on their properties
  return (
    <div>
      {tenantData.firstName ? (
        <>
          <h2>Modify Account</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic-input"
              size="small"
              label="First Name"
              onChange={handleChange}
              name="firstName"
              value={updatedTenant.firstName}
            />
            <p>
              <TextField
                id="outlined-basic-input"
                size="small"
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                value={updatedTenant.lastName}
              />
            </p>
            <p>
              <TextField
                id="outlined-basic-input"
                size="small"
                label="Email"
                onChange={handleChange}
                name="email"
                value={updatedTenant.email}
              />
            </p>
            <p>
              <TextField
                id="outlined-basic-input"
                type="tel"
                size="small"
                label="Phone Number"
                onChange={handleChange}
                name="phoneNumber"
                value={updatedTenant.phoneNumber}
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

export default TenantAccountComponent;
