import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import api from "../../utilities/axiosConfig";
import { UserContext } from "../../context/UserContext";
import States from "../../data/states.json";
import SuccessSnackBar from './../snackbar/SuccessSnackBar';

const CreditCardPaymentDialog = ({ open, onClose }) => {
  const { addUser, user } = UserContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [creditCardAdd, setCreditCardAdd] = useState([]);

  //   checks if a credit card in one of the validated cards listed below in the object
  function isValidCard(cardNumber) {
    console.log("Valid card number passed: ", cardNumber);
    const validCreditCards = [
      { visa: "4111111111111111" },
      { mastercard: "5555555555554444" },
      { americanExpress: "378282246310005" },
      { discover: "6011111111111117" },
    ];
    for (const card of validCreditCards) {
      // Extract the card number from the object
      const validNumber = Object.values(card)[0];
      if (cardNumber === validNumber) {
        return true; // If you want to return a boolean indicating validity
      }
    }
    return false;
  }

  //snack bar state variables
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  //snack bar on close function
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const addCreditCard = async () => {
    //uses the isValidCard function and creates a post request if the functions is true
    if (isValidCard(cardNumber)) {
      console.log("Card is valid and submitting post");
      try {
        let response = await api.post("/creditcard", {
          name: name,
          cardNumber: Number(cardNumber),
          cvv: cvv,
          streetAddress: streetAddress,
          city: city,
          state: state,
          zip: zip,
          tenantId: user[0].tenantId,
        });
        if (response.status === 201) {
          let newCard = response.data;
          setCreditCardAdd(newCard);
          //set true to open snack bar
          setSnackbarOpen(true);
          setSnackbarMessage('Successfully created contract.')
          clearFields();
          onClose();
        }
        return;
      } catch (error) {
        console.log(error);
        console.log("Post request error");
      }
    }
    handleErrorCancel();
    alert("Invalid Credit Card");
  };

  const handleSubmitCreditCardClick = () => {
    try {
      addCreditCard();
    } catch (error) {
      alert(error.message);
      handleErrorCancel();
    }
  };

  useEffect(() => { }, [creditCardAdd]);

  const clearFields = () => {
    setName("");
    setCardNumber("");
    setCvv("");
    setStreetAddress("");
    setCity("");
    setState("");
    setZip("");
  };

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

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Credit Card Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="Credit Card Number"
            type="string"
            fullWidth
            variant="standard"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="Street Address"
            type="text"
            fullWidth
            variant="standard"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="CVV"
            type="text"
            fullWidth
            variant="standard"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-helper-label">
                State
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state}
                name="state"
                label="States"
                onChange={(e) => setState(e.target.value)}
              >
                {States.map((state, idx) => {
                  return (
                    <MenuItem key={idx} value={state}>
                      {state}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Zipcode"
            type="text"
            fullWidth
            variant="standard"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              onClose();
              handleErrorCancel();
              clearFields();
            }}
            color="error"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitCreditCardClick} color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
          Credit Card Not Saved
        </MuiAlert>
      </Snackbar>
      <SuccessSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default CreditCardPaymentDialog;
