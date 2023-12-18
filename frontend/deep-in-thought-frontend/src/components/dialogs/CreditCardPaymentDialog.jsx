import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CreditCardPaymentDialog = ({ open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Credit Card Information</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant='standard'/>
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Credit Card Number"
                    type="text"
                    fullWidth
                    variant='standard'/>
                
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Street Address"
                    type="text"
                    fullWidth
                    variant='standard'/>
                
                <TextField 
                    autoFocus
                    margin="dense"
                    label="CVV"
                    type="text"
                    fullWidth
                    variant='standard'/>
                
                <TextField 
                    autoFocus
                    margin="dense"
                    label="City"
                    type="text"
                    fullWidth
                    variant='standard'/>
                
                <TextField 
                    autoFocus
                    margin="dense"
                    label="State"
                    type="text"
                    fullWidth
                    variant='standard'/>
                
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Zipcode"
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

export default CreditCardPaymentDialog