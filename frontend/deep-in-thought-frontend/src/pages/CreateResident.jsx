import { Button, TextField, Container, Typography } from '@mui/material';
import { useState } from 'react';
import tenantService from '../utilities/tenantService';

const CreateResident = () => {
    // resident register information
    const [resident, setResident] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: ''
    });

    const residentRegisterRequest = async () => {
        const response = await tenantService.register(resident);
        console.log(response)
    }

    const onChangeResidentInfo = (e) => {
        setResident({ ...resident, [e.target.name]: e.target.value });
    };

    const onSubmitRegister = async (e) => {
        e.preventDefault()
        console.log(resident);
        
        try {
            const response = await tenantService.register(resident);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Add Resident
            </Typography>
            <form onSubmit={onSubmitRegister}>
                <TextField
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    variant="standard"
                    required
                    value={resident.firstName}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    variant="standard"
                    required
                    value={resident.lastName}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type='email'
                    required
                    fullWidth
                    variant="standard"
                    value={resident.email}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                    value={resident.password}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    variant="standard"
                    required
                    value={resident.phone}
                    onChange={onChangeResidentInfo}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    type='submit'
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default CreateResident