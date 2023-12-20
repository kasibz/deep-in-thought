import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import * as React from 'react';
import {useState, useEffect} from "react";
import api from '../../utilities/axiosConfig';
import { UserContext } from '../../context/UserContext';
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';



import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const ExistingCreditCardDialog = (props) => {
    const { addUser, user } = UserContext()
    const { onClose, selectedValue, open } = props;

    const [creditCardData, setCreditCardData] = useState([])

    const [openDialog, setOpenDialog] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [addNewPayment, setAddNewPayment] = useState([])

    const [paymentAmount, setPaymentAmount] = useState(0)
    const [datePaid, setDatePaid] = useState("");
    const [dateDue, setDateDue] = useState("");
    const [creditCardId, setCreditCardId] = useState("");
    const [paid, setPaid] = useState(true); 


    const addPayment = async(e) => {
      try{
        e.preventDefault()
        let response = await api.post('/payment', {
            datePaid: datePaid,
            dateDue: dateDue,
            amount: Number(paymentAmount),
            paid: paid, 
            creditCardId: creditCardId
        })
        console.log("Response: ", response.status)
        let newPayment = response.data 
      }
      catch(error) {
        console.log(error)
        console.log(paymentAmount)
        console.log(datePaid)
        console.log(dateDue)
        console.log(paid)
        console.log(creditCardId)
      }
    }
    
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

    useEffect(() =>{
        const getCreditCard = async() => {
        let response = await api.get(`creditcard/tenant/${user[0].tenantId}`)
        let data = response.data 
        setCreditCardData(data)
    }
        getCreditCard()
    }, [])
   
    const handleClose = () => {
        onClose(selectedValue);
      };
    
      const handleListItemClick = (value) => {
        
      };

    return (
        <><Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pay Rent</DialogTitle>
            <List sx={{ pt: 1 }}>
        {creditCardData.map((card, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton onClick={() =>{ ;
                    setCreditCardId(card.id)}}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={card.cardNumber} />
            </ListItemButton>
          </ListItem>
          
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>

      <TextField
        autoFocus
        margin="dense"
        label="Amount"
        type="number"
        fullWidth
        variant='standard'
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
                     />
        <TextField
        autoFocus
        margin="dense"
        type="datetime-local"
        fullWidth
        variant='standard'
        value={dateDue}
        onChange={(e) => setDateDue(e.target.value)}
                     />
        <TextField
        autoFocus
        margin="dense"
        type="datetime-local"
        fullWidth
        variant='standard'
        value={datePaid}
        onChange={(e) => setDatePaid(e.target.value)}
                     />

        <DialogActions>
            <Button onClick={()=>{ 
                    onClose(); 
                    handleErrorCancel()}} color="error">Cancel</Button>
                <Button onClick={(e)=>{ 
                    onClose(); 
                    handleSuccessCancel();
                    addPayment(e);
                    }} 
                    color="success">Submit</Button>
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
        </Snackbar>
       </>
    );
}

export default ExistingCreditCardDialog