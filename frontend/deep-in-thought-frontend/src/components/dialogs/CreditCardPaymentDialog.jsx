import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import * as React from 'react';
import {useState, useEffect} from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import api from '../../utilities/axiosConfig';
import { UserContext } from '../../context/UserContext';
import { ErrorInfo } from 'react';

const CreditCardPaymentDialog = ({ open, onClose}) => {
    const { addUser, user } = UserContext()
    const [openDialog, setOpenDialog] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);

    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")

    const [creditCardAdd, setCreditCardAdd] = useState([])

    const addCreditCard = async(e) => {
        console.log("Add credit card started...")
        e.preventDefault()
        try {
        let response = await api.post('/creditcard', {
            name: name,
            cardNumber: cardNumber,
            cvv: cvv,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zip: zip,
            tenantId:user[0].tenantId
        })
        let newCard = response.data 
        console.log(response)
        setCreditCardAdd(newCard)
    }

    catch(error){
        console.log(error)
        console.log("Post request error")
    }
    }

    useEffect(() => {
        console.log("Credit Cards: ", creditCardAdd);
    }, [creditCardAdd]);

    
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
                    variant='standard' 
                    value={name}
                    onChange= {(e) => setName(e.target.value)} />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Credit Card Number"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={cardNumber}
                    onChange= {(e) => setCardNumber(e.target.value)}
                     />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Street Address"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={streetAddress}
                    onChange= {(e) => setStreetAddress(e.target.value)} />

                <TextField
                    autoFocus
                    margin="dense"
                    label="CVV"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={cvv}
                    onChange= {(e) => setCvv(e.target.value)} />

                <TextField
                    autoFocus
                    margin="dense"
                    label="City"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={city}
                    onChange= {(e) => setCity(e.target.value)} />

                <TextField
                    autoFocus
                    margin="dense"
                    label="State"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={state}
                    onChange= {(e) => setState(e.target.value)} />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Zipcode"
                    type="text"
                    fullWidth
                    variant='standard'
                    value={zip}
                    onChange= {(e) => setZip(e.target.value)} />

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onClose();
                    handleErrorCancel();
                } } color="error">Cancel</Button>
                <Button onClick={(e) => {
                    onClose();
                    handleSuccessCancel();
                    addCreditCard(e);
                    
                }} color="success">Submit</Button>
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