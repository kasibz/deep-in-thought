import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import * as React from 'react';

const RentPaymentDialog = ({ open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Credit Card Information</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Amount"
                    type="text"
                    fullWidth
                    variant='standard'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RentPaymentDialog