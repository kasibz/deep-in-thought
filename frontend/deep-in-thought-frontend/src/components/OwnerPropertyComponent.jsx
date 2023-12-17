import { Container, List, ListItem, ListItemText, Typography, Button, Divider } from '@mui/material';

import { Fragment } from 'react';
const myProperties = [
    { id: 1, name: 'Lakeside Condo', type: 'Condo', address: '123 Lakeview St' },
    { id: 2, name: 'Downtown Loft', type: 'Loft', address: '456 Citycenter Ave' },
];
const OwnerPropertyComponent = () => {
    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                My Properties
            </Typography>
            <List>
                {myProperties.map((property, index) => (
                    <Fragment key={property.id}>
                        <ListItem>
                            <ListItemText
                                primary={property.name}
                                secondary={`Type: ${property.type} - Address: ${property.address}`}
                            />
                        </ListItem>
                        {index !== myProperties.length - 1 && <Divider />}
                    </Fragment>
                ))}
                <ListItem>
                    <Button
                        variant="outlined"
                        // startIcon={<AddIcon />}
                        fullWidth
                        // onClick={onAddProperty}
                    >
                        Add Property
                    </Button>
                </ListItem>
            </List>
        </Container>
    )
}

export default OwnerPropertyComponent