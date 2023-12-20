import { Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import {useState, useEffect } from "react";


function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

const ErrorSnackBar = ({open, onClose}) => {

    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
        onClose();
    };


  return(<>
    <Button onClick={()=>{
        
        handleErrorCancel();
        onClose();
        }} color="error">Cancel</Button>


  <Snackbar open={errorSnackbar}  onClose={handleErrorCloseSnackbar}>
                <MuiAlert elevation={6} variant="outlined" color="error" onClose={handleErrorCloseSnackbar} severity="info">
                    Payment Not Processed
                </MuiAlert>
        </Snackbar>
    </>);

}
export default ErrorSnackBar