import { Container, List, ListItemButton, ListItemText, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ListItem } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMyPropertyContext } from './../context/PropertyContext';
import AddPropertyDialog from './dialogs/AddPropertyDialog';
import propertyService from '../utilities/propertyService';
import { UserContext } from './../context/UserContext';

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
    const { ownerProperties, addOwnerProperty } = useMyPropertyContext();

    // calling user context
    const { user } = UserContext();

    useEffect(() => {
        const getOwnerProperties = async () => {
            try {
                const response = await propertyService.getAllPropertiesByIdForOwner(user[0].ownerId)
                console.log(response)
                if (response.status === 200) {
                    addOwnerProperty(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getOwnerProperties()
    }, [])

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
                {ownerProperties && ownerProperties.length > 0 ? ownerProperties[0].map((property, index) => (
                    <Fragment key={property.id}>
                        <ListItemButton onClick={() => onClickProperty(property)}>
                            <ListItemText
                                primary={property.name}
                                secondary={`Type: ${property.type} - Address: ${property.streetAddress} ${property.city} ${property.state} ${property.zipcode}`}
                            />
                        </ListItemButton>
                        {index !== ownerProperties.length - 1 && <Divider />}
                    </Fragment>
                )) : <div>You currently have no properties listed. Click here to add your first property</div>}
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
