import { Container, List, ListItemButton, ListItemText, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ListItem } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMyPropertyContext } from './../context/PropertyContext';
import AddPropertyDialog from './dialogs/AddPropertyDialog';
import propertyService from '../utilities/propertyService';
import { UserContext } from './../context/UserContext';
import SuccessSnackBar from './snackbar/SuccessSnackBar';

const OwnerPropertyComponent = () => {
    // calling user context
    const { user } = UserContext();

    // navigate hook to allow navigate to different routes
    const navigate = useNavigate();

    // open and close state variable for dialog
    const [open, setOpen] = useState(false);

    // new property state variable
    const [newProperty, setNewProperty] = useState({
        name: '',
        type: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        ownerId: user[0].ownerId,
    });

    // calling property context state variables
    const { ownerProperties, addOwnerProperty } = useMyPropertyContext();
    //loading variable 
    const [isLoading, setIsLoading] = useState(true);

    // get list of owner's list of properties and persist data
    useEffect(() => {
        const getOwnerProperties = async () => {
            try {
                const response = await propertyService.getAllPropertiesByIdForOwner(user[0].ownerId)
                // console.log(response)
                if (response.status === 200) {
                    addOwnerProperty(response.data)
                }
                setIsLoading(false); // Set loading to false once data has bee fetched
            } catch (error) {
                console.log(error)
                setIsLoading(false); // Set loading to false once data has bee fetched
            }
        }
        getOwnerProperties()
    }, [open]) // whenever there is a change in this variable, this useEffect will be triggered.

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

    //snack bar state variables
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    //snack bar on close function
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const onSubmitAddProproperty = async () => {
        console.log(newProperty);
        try {
            const addPropertyResponse = await propertyService.addProperty(newProperty);
            console.log(addPropertyResponse)
            if (addPropertyResponse.status === 201) {
                //snack bar message
                setSnackbarMessage('Property added successfully!');
                //set true to open snack bar
                setSnackbarOpen(true);
                // close dialog
                setOpen(false);
            } else {
                alert('something is wrong. This need to be changed')
            }
        } catch (error) {
            console.log(error)
        }
    };
    // display none when loading variable is true
    if (isLoading) {
        return <div></div>;
    }

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                My Properties
            </Typography>
            <List>
                {ownerProperties && ownerProperties.length > 0 ? ownerProperties.map((property, index) => (
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
            <SuccessSnackBar
                open={snackbarOpen}
                message={snackbarMessage}
                handleClose={handleCloseSnackbar}
            />
        </Container>
    );
}

export default OwnerPropertyComponent;
