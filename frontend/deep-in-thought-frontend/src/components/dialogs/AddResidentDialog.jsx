import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';

const AddResidentDialog = ({ open, onClose }) => {

    const { propertyId } = useParams();

    const [resident, setResident] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: '',
        id: propertyId // auto populated from url.
    });

    const onChangeResidentInfo = (e) => {
        setResident({ ...resident, [e.target.name]: e.target.value });
    };

    const onSubmitRegister = () => {
        console.log(resident);
        onClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Resident</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    variant="standard"
                    value={resident.firstName}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    variant="standard"
                    value={resident.lastName}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
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
                    value={resident.password}
                    onChange={onChangeResidentInfo}
                />
                <TextField
                    margin="dense"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    variant="standard"
                    value={resident.phone}
                    onChange={onChangeResidentInfo}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmitRegister}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddResidentDialog;
