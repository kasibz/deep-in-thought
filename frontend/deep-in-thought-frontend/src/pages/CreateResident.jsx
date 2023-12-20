import { Button, TextField, Container, Typography } from '@mui/material';
import { useState } from 'react';
import tenantService from '../utilities/tenantService';
import { useNavigate } from 'react-router-dom';

const CreateResident = () => {
    // resident register information
    const [resident, setResident] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phoneNumber: ''
    });

    const navigate = useNavigate()

    const onChangeResidentInfo = (e) => {
        setResident({ ...resident, [e.target.name]: e.target.value });
    };

    const onSubmitRegister = async (e) => {
        e.preventDefault()
        console.log(resident);

        try {
            const response = await tenantService.register(resident);
            if (response.status === 201){
                alert('Successfully Created new resident user. do not for get to change this alert thing Ho Jong')
                navigate('/')
            }
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
                    name="phoneNumber"
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