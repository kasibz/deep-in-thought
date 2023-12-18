import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import {useState } from "react";


const RentPaymentDialog = ({ open, onClose}) => {
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
            <DialogTitle>Payment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Amount"
                    type="text"
                    fullWidth
                    variant='standard' />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{ 
                    onClose(); 
                    handleErrorCancel()}} color="error">Cancel</Button>
                <Button onClick={()=>{ 
                    onClose(); 
                    handleSuccessCancel()}} color="success">Submit</Button>
            </DialogActions>

        </Dialog>
        <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={handleErrorCloseSnackbar}>
                <MuiAlert elevation={6} variant="outlined" color="error" onClose={handleErrorCloseSnackbar} severity="info">
                    Payment Not Submitted
                </MuiAlert>
        </Snackbar>
        
        <Snackbar open={successSnackbar} autoHideDuration={3000} onClose={handleSuccessCloseSnackbar}>
                <MuiAlert elevation={6} variant="outlined" color="success" onClose={handleSuccessCloseSnackbar} severity="info">
                    Success
                </MuiAlert>
        </Snackbar></>
        
    );
}

export default RentPaymentDialog