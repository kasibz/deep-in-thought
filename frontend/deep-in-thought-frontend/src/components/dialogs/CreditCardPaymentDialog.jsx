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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import api from "../../utilities/axiosConfig";
import { UserContext } from "../../context/UserContext";

const CreditCardPaymentDialog = ({ open, onClose }) => {
  const { addUser, user } = UserContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

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

  const addCreditCard = async (e) => {
    console.log("Add credit card started...");
    e.preventDefault();

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
        let newCard = response.data;
        console.log(response);
        setCreditCardAdd(newCard);
        alert("Success");
      } catch (error) {
        console.log(error);
        console.log("Post request error");
      }
    }
    setSuccessSnackbar(false);
    alert("Invalid Credit Card");
  };

  useEffect(() => {
  }, [creditCardAdd]);

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

  const handleSuccessCancel = () => {
    setSuccessSnackbar(true);
  };

  const handleSuccessCloseSnackbar = () => {
    setSuccessSnackbar(false);
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
          <TextField
            autoFocus
            required
            margin="dense"
            label="State"
            type="text"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
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
          <Button
            onClick={(e) => {
              onClose();
              handleSuccessCancel();
              addCreditCard(e);
              clearFields();
            }}
            color="success"
          >
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
          Credit Card Added
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CreditCardPaymentDialog;
