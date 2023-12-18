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
                    name="address"
                    label="Address"
                    fullWidth
                    variant="standard"
                    value={newProperty.address}
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