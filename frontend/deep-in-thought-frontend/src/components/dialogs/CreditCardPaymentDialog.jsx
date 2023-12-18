import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import * as React from 'react';
import {useState} from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const CreditCardPaymentDialog = ({ open, onClose}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    
    const handleErrorClickOpen = () => {
      setOpenDialog(true);
    };
  
    const handleErrorCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleErrorCancel = () => {
      setErrorSnackbar(true);
      handleErrorCloseDialog();
    };
  
    const handleErrorCloseSnackbar = () => {
      setErrorSnackbar(false);
    };

    const handleSuccessClickOpen = () => {
        setOpenDialog(true);
      };
    
      const handleSuccessCloseDialog = () => {
        setOpenDialog(false);
      };
    
      const handleSuccessCancel = () => {
        setSuccessSnackbar(true);
      };
    
      const handleSuccessCloseSnackbar = () => {
        setSuccessSnackbar(false);
      };

    return (
        <><Dialog open={open} onClose={onClose}>
            <DialogTitle>Credit Card Information</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant='standard' />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Credit Card Number"
                    type="text"
                    fullWidth
                    variant='standard' />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Street Address"
                    type="text"
                    fullWidth
                    variant='standard' />

                <TextField
                    autoFocus
                    margin="dense"
                    label="CVV"
                    type="text"
                    fullWidth
                    variant='standard' />

                <TextField
                    autoFocus
                    margin="dense"
                    label="City"
                    type="text"
                    fullWidth
                    variant='standard' />

                <TextField
                    autoFocus
                    margin="dense"
                    label="State"
                    type="text"
                    fullWidth
                    variant='standard' />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Zipcode"
                    type="text"
                    fullWidth
                    variant='standard' />

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onClose();
                    handleErrorCancel();
                } } color="error">Cancel</Button>
                <Button onClick={() => {
                    onClose();
                    handleSuccessCancel();
                } } color="success">Submit</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={handleErrorCloseSnackbar}>
                <MuiAlert elevation={6} variant="outlined" color="error" onClose={handleErrorCloseSnackbar} severity="info">
                    Credit Card Not Saved
                </MuiAlert>

            </Snackbar><Snackbar open={successSnackbar} autoHideDuration={3000} onClose={handleSuccessCloseSnackbar}>
                <MuiAlert elevation={6} variant="outlined" color="success" onClose={handleSuccessCloseSnackbar} severity="info">
                    Credit Card Added
                </MuiAlert>
            </Snackbar></>
    );
}

export default CreditCardPaymentDialog