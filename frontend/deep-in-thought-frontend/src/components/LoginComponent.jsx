import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoginComponent = ({
  userLoginInfo,
  setUserLoginInfo,
  setUserTypeChecked,
  loginRequest,
}) => {
  const [loading, setLoading] = useState(false);

  const onChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserLoginInfo(() => ({
      ...userLoginInfo,
      [name]: value,
    }));
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginRequest();
    setLoading(false);
  };

  const onChangeCheckBox = (e) => {
    setUserTypeChecked(e.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={onSubmitLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={onChangeUserInfo}
            type="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangeUserInfo}
          />
          {!loading ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          ) : (
            <CircularProgress />
          )}
        </form>
        <FormControlLabel
          control={<Checkbox onChange={onChangeCheckBox} />}
          label="Check this box if you are Owner"
        />
        <Link href="signup">Owner Registration</Link>
      </Box>
    </Container>
  );
};

export default LoginComponent;
