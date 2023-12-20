import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import api from "../../utilities/axiosConfig";
import { UserContext } from "../../context/UserContext";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Slide from "@mui/material/Slide";

import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { blue } from "@mui/material/colors";

const PayByCreditCardDialog = (props) => {
  const { addUser, user } = UserContext();
  const { onClose, selectedValue, open } = props;

  const [creditCardData, setCreditCardData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [addNewPayment, setAddNewPayment] = useState([]);

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [datePaid, setDatePaid] = useState("");
  const [dateDue, setDateDue] = useState("");
  const [creditCardId, setCreditCardId] = useState("");
  const [paid, setPaid] = useState(true);
  const [contractData, setContractData] = useState([]);
  const [rentDate, setRentDate] = useState(rentDueDate());

  //this function sets the rent due date to the first of the month
  function rentDueDate() {
    const today = new Date();
    let month = today.getMonth() + 2;
    const year = today.getFullYear() + 1;
    let date = 1;
    // Adjust the month if it's greater than 11
    if (month > 11) {
      month = month % 12; // Get the remainder after dividing by 12
    }

    const formattedDate = date < 10 ? `0${date}` : date;

    // Convert month to a string with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}-${formattedDate}`;
  }


  //this function gets the contract data for the tenant 
  useEffect(() => {
    const getContractData = async () => {
      let response = await api.get(`tenant/${user[0].tenantId}/contract`);
      let balanceData = response.data;
      setContractData(balanceData);

      console.log("Contract data: ", balanceData);
    };
    setPaymentAmount(contractData.rent);

    getContractData();
  }, []);


  //this function passes the post request to post a payment in the database
  const addPayment = async (e) => {
    try {
      e.preventDefault();
      let response = await api.post("/payment", {
        datePaid: datePaid,
        dateDue: dateDue,
        amount: Number(paymentAmount),
        paid: paid,
        creditCardId: creditCardId,
      });
      let newPayment = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //these all handle the open and close of the dialog box based on if cancel or submit are clicked 
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

  //get request to get all the available credit cards from that tenant
  useEffect(() => {
    const getCreditCard = async () => {
      let response = await api.get(`creditcard/tenant/${user[0].tenantId}`);
      let data = response.data;
      setCreditCardData(data);
    };
    getCreditCard();
  }, []);

  //closes dialog box 
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {};
  const [fullWidth, setFullWidth] = React.useState(true);
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={fullWidth}>
        <DialogTitle>Pay Rent</DialogTitle>
        <List sx={{ pt: 1 }}>
          {creditCardData.map((card, index) => (
            //this list item pulls all the credit cards and displays the last four digits along with a number logo
            <ListItem disableGutters key={index}>
              <ListItemButton
                onClick={() => {
                  setCreditCardId(card.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <AttachMoneyOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={String(card.cardNumber).substring(
                    String(card.cardNumber).length - 5,
                    String(card.cardNumber).length - 1
                  )}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* sets the amount value to the rent, can't be changed */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={paymentAmount}
          />
        </FormControl>
        
        <TextField
          autoFocus
          required
          margin="dense"
          type="date"
          fullWidth
          variant="standard"
          uncontrolled="true"
          value={rentDate}
          onChange={(e) => setRentDate(e.target.value)}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          type="date"
          fullWidth
          variant="standard"
          helperText="Select Today's Date"
          onChange={(e) => setDatePaid(e.target.value)}
        />

        {/* This handles the open and close dialog when clicking submit or cancel */}
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              handleErrorCancel();
            }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              onClose();
              handleSuccessCancel();
              addPayment(e);
            }}
            color="success"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* snackbar pop ups along with alerts  */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="outlined"
          color="error"
          onClose={handleErrorCloseSnackbar}
          severity="info"
        >
          Payment Not Submitted
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="outlined"
          color="success"
          onClose={handleSuccessCloseSnackbar}
          severity="info"
        >
          Success
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PayByCreditCardDialog;
