import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material"

const SignupComponent = ({ userSingupInfo, setUserSingupInfo, registerRequest, setIsLoading, isLoading }) => {

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
        <Container className="container" component="main" maxWidth="xs">
            <Box
                className="general-box"
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">Create your account</Typography>
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
                {isLoading &&
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}>
                        <CircularProgress />
                    </Box>
                }
        </Container>
    )
}

export default SignupComponent