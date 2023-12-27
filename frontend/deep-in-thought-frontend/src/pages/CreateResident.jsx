import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import tenantService from "../utilities/tenantService";
import { useNavigate } from "react-router-dom";
import SuccessSnackBar from "../components/snackbar/SuccessSnackBar";
import emailjs from "@emailjs/browser";

const CreateResident = () => {
  // resident register information
  const [resident, setResident] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const onChangeResidentInfo = (e) => {
    setResident({ ...resident, [e.target.name]: e.target.value });
  };

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

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await tenantService.register(resident);
      if (response.status === 201) {
        var templateParams = {
          email: resident.email,
          password: resident.password,
        };

        // consider env variables
        emailjs
          .send(
            "service_ra3ekaj",
            "template_f01y6xj",
            templateParams,
            "L6pFCLq28Efxgtlr_"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
        // set success snack bar
        setSnackbarMessage("Successfully Created new resident user");
        // open snack bar
        setSnackbarOpen(true);
        //wait 2 seconds until success message to pop up, then navigate to home page
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      error.message.includes("409")
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
    }
  };

  return (
    <Container className="container" maxWidth="sm">
      <Box className="general-box">
        {residentRegisterResponse.failure && (
          <Alert severity="error">{residentRegisterResponse.message}</Alert>
        )}
        <Typography variant="h4" gutterBottom>
          Add Resident
        </Typography>
        <form onSubmit={onSubmitRegister}>
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            required
            value={resident.firstName}
            onChange={onChangeResidentInfo}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            required
            value={resident.lastName}
            onChange={onChangeResidentInfo}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            required
            value={resident.email}
            onChange={onChangeResidentInfo}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            required
            value={resident.password}
            onChange={onChangeResidentInfo}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            required
            value={resident.phone}
            onChange={onChangeResidentInfo}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
        <SuccessSnackBar
          open={snackbarOpen}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
        />
      </Box>
    </Container>
  );
};

export default CreateResident;
