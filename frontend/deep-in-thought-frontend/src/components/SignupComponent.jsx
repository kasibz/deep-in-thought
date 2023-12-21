import { Box, Button, Container, TextField } from "@mui/material"

const SignupComponent = ({userSingupInfo, setUserSingupInfo, registerRequest}) => {

    const onChangeUserSignupInfo = (e) => {
        const { name, value } = e.target;
        // update phoneNumber to Number type
        const updatedValue = name === 'phoneNumber' ? Number(value) : value;
        setUserSingupInfo(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    }

    const onSubmitSignup = async (e) => {
        e.preventDefault()
        console.log(userSingupInfo)
        await registerRequest();

    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={onSubmitSignup}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="FirstName"
                        label="First Name"
                        name="firstName"
                        onChange={onChangeUserSignupInfo}
                        type="text"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="LastName"
                        label="Last Name"
                        name="lastName"
                        onChange={onChangeUserSignupInfo}
                        type="text"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Email"
                        label="Email Address"
                        name="email"
                        onChange={onChangeUserSignupInfo}
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
                        onChange={onChangeUserSignupInfo}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="PhoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={onChangeUserSignupInfo}
                        type="number"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default SignupComponent