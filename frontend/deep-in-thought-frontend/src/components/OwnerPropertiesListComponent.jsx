import { Container, List, ListItemButton, ListItemText, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, ListItem } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';

const myProperties = [
    { id: 1, name: 'Lakeside Condo', type: 'Condo', address: '123 Lakeview St' },
    { id: 2, name: 'Downtown Loft', type: 'Loft', address: '456 Citycenter Ave' },
];

const OwnerPropertyComponent = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);

    const navigate = useNavigate();

    // open and close state variable for dialog
    const [open, setOpen] = useState(false);

    // new property state variable
    const [newProperty, setNewProperty] = useState({
        name: '',
        type: '',
        address: ''
    });

    const onClickOpenDialog = () => {
        // Open the dialog
        setOpen(true);
    };

    const onClickCloseDialog = () => {
        // Close the dialog
        setOpen(false);
    };

    const onClickProperty = (property) => {
        console.log(property);
        navigate(`/property/${property.id}`)
    };

    const onChangeAddPropertyTextField = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
    };

    const onSubmitAddProproperty = () => {

        console.log(newProperty);
        // Reset the form
        setNewProperty({ name: '', type: '', address: '' });
        // Close the dialog
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                My Properties
            </Typography>
            <List>
                {myProperties.map((property, index) => (
                    <Fragment key={property.id}>
                        <ListItemButton onClick={() => onClickProperty(property)}>
                            <ListItemText
                                primary={property.name}
                                secondary={`Type: ${property.type} - Address: ${property.address}`}
                            />
                        </ListItemButton>
                        {index !== myProperties.length - 1 && <Divider />}
                    </Fragment>
                ))}
                <ListItem>
                    <Button onClick={onClickOpenDialog} variant="outlined" fullWidth>
                        Add Property
                    </Button>
                </ListItem>
            </List>

            {/* Add Property Dialog */}
            <Dialog open={open} onClose={onClickCloseDialog}>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={newProperty.name}
                        onChange={onChangeAddPropertyTextField}
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Type"
                        fullWidth
                        variant="standard"
                        value={newProperty.type}
                        onChange={onChangeAddPropertyTextField}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={newProperty.address}
                        onChange={onChangeAddPropertyTextField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickCloseDialog}>Cancel</Button>
                    <Button onClick={onSubmitAddProproperty}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default OwnerPropertyComponent;
