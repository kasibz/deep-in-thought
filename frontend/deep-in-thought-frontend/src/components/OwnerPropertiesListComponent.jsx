import { Container, List, ListItemButton, ListItemText, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ListItem } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMyPropertyContext } from './../context/PropertyContext';
import AddPropertyDialog from './dialogs/AddPropertyDialog';

//placement data for properties list
const myProperties = [
    { id: 1, name: 'Lakeside Condo', type: 'Condo', address: '123 Lakeview St' },
    { id: 2, name: 'Downtown Loft', type: 'Loft', address: '456 Citycenter Ave' },
];

const OwnerPropertyComponent = () => {

    // navigate hook to allow navigate to different routes
    const navigate = useNavigate();

    // open and close state variable for dialog
    const [open, setOpen] = useState(false);

    // new property state variable
    const [newProperty, setNewProperty] = useState({
        name: '',
        type: '',
        address: ''
    });

    // calling property context state variables
    const {ownerProperty, addOwnerProperty} = useMyPropertyContext();

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
            <AddPropertyDialog                 
                open={open} 
                onClose={onClickCloseDialog} 
                newProperty={newProperty} 
                onChange={onChangeAddPropertyTextField} 
                onSubmit={onSubmitAddProproperty} 
            />
        </Container>
    );
}

export default OwnerPropertyComponent;
