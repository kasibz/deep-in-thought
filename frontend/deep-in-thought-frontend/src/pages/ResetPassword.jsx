import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Alert, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authService from "../utilities/authService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Deep In Thought</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword() {
  const [password, setPassword] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitClicked(true);
    if (password.password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setPassword({ password: "" });
      setConfirmPassword("");
      setSubmitClicked(false);
      return;
    }

    if (password.password == "" || confirmPassword == "") {
      setErrorMessage("Both fields require input.");
      setSubmitClicked(false);
      return;
    }
    const ownerExists = localStorage.getItem("ownerId") !== null;
    const tenantExists = localStorage.getItem("tenantId") !== null;
    let token, userRole;
    if (ownerExists) {
      token = localStorage.getItem("ownerId");
      userRole = "owner";
    }
    if (tenantExists) {
      token = localStorage.getItem("tenantId");
      userRole = "tenant";
    }

    try {
      const response = await authService.updatePassword(
        token,
        password,
        userRole
      );
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          document.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSubmitClicked(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgb(148, 148, 148)",
            borderRadius: "0.5rem",
            backgroundImage:
              "linear-gradient(to bottom right, white 40%, #ebebeb)",
            padding: "3rem 4rem",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {success && (
            <Alert severity="success">Password changed Successfully</Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password.password}
                  onChange={(e) => setPassword({ password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {submitClicked ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} style={{ color: "#ebebeb" }} />
      </Container>
    </ThemeProvider>
  );
}
