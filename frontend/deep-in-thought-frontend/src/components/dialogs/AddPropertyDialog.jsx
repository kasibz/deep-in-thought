import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const AddPropertyDialog = ({ open, onClose, newProperty, onChange, onSubmit }) => {
    return (
        <Dialog open={open} onClose={onClose}>
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
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="type"
                    label="Type"
                    fullWidth
                    variant="standard"
                    value={newProperty.type}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="streetAddress"
                    label="Street"
                    fullWidth
                    variant="standard"
                    value={newProperty.streetAddress}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="city"
                    label="City"
                    fullWidth
                    variant="standard"
                    value={newProperty.city}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="state"
                    label="State"
                    fullWidth
                    variant="standard"
                    value={newProperty.state}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="zipcode"
                    label="Zipcode"
                    fullWidth
                    variant="standard"
                    value={newProperty.zipcode}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}


export default AddPropertyDialog