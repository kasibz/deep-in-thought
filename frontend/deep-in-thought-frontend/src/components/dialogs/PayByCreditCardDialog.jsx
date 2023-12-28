import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import api from "../../utilities/axiosConfig";
import { UserContext } from "../../context/UserContext";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { blue } from "@mui/material/colors";
import contractService from "../../utilities/contractService";
import { useNavigate } from "react-router-dom";

const PayByCreditCardDialog = (props) => {
  const navigate = useNavigate();
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
  //function to get the last of the month
  function getLastDayOfMonthFormatted() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // First day of the next month
    const firstDayNextMonth = new Date(currentYear, currentMonth + 1, 1);

    // Last day of the current month
    const lastDayThisMonth = new Date(firstDayNextMonth - 1);

    // Formatting year, month, and date
    const year = lastDayThisMonth.getFullYear();
    const month = lastDayThisMonth.getMonth() + 1; // getMonth() returns 0-11
    const date = lastDayThisMonth.getDate();

    // Ensuring month and date are in 'MM' and 'DD' format
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = date < 10 ? `0${date}` : `${date}`;

    return `${year}-${formattedMonth}-${formattedDate}`;
  }
  //function to get current day
  function getTodaysDateFormatted() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() returns 0-11
    const date = today.getDate();

    // Ensuring month and date are in 'MM' and 'DD' format
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = date < 10 ? `0${date}` : `${date}`;

    return `${year}-${formattedMonth}-${formattedDate}`;
  }
  // calling above functions
  const formattedToday = getTodaysDateFormatted();
  const formattedEndOfMonth = getLastDayOfMonthFormatted();

  //this function gets the contract data for the tenant
  useEffect(() => {
    const getContractData = async () => {
      let response = await api.get(`tenant/${user[0].tenantId}/contract`);
      let balanceData = response.data;
      setContractData(balanceData);
      setPaymentAmount(balanceData.rent);
    };

    getContractData();
  }, []);

  // listen for the openDialogChange and edit the contract as needed to reflect the payment maid
  const editContract = async () => {
    try {
      const updatedContract = {
        length: contractData.length - 1,
      };
      let response = await contractService.editContract(
        contractData.contract_id,
        updatedContract
      );
    } catch (error) {
      console.log(error);
    }
  };

  //this function passes the post request to post a payment in the database
  const addPayment = async (e) => {
    try {
      e.preventDefault();
      const paymentData = {
        datePaid: formattedToday,
        dateDue: formattedEndOfMonth,
        amount: Number(paymentAmount),
        paid: paid,
        creditCardId: creditCardId,
      };
      let response = await api.post("/payment", paymentData);
      if (response.status === 201) {
        setOpenDialog(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // handle on amount
  const handleAmountChange = (event) => {
    setPaymentAmount(event.target.value);
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
        <FormControl fullWidth>
          <InputLabel>Credit Card</InputLabel>
          <Select
            value={creditCardId}
            label="Credit Card"
            onChange={(event) => {
              setCreditCardId(event.target.value);
            }}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {creditCardData.map((card, index) => (
              <MenuItem
                key={index}
                value={card.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", // Center the content vertically
                  width: "300px", // Adjust the width as needed
                  margin: "auto",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: blue[100],
                    color: blue[600],
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    margin: "auto",
                  }}
                >
                  <AttachMoneyOutlinedIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  />
                </Avatar>
                <Typography>
                  <ListItemText
                    sx={{ p: 1, textAlign: "center", alignContent: "center" }}
                    primary={
                      "XXXX-XXXX-XXXX-" + String(card.cardNumber).slice(-4)
                    }
                  />
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* sets the amount value to the rent, can't be changed */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={handleAmountChange}
            value={paymentAmount}
          />
        </FormControl>

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
              editContract();
              setTimeout(() => {
                navigate(0);
              }, 2000);
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
          variant="filled"
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
        className="snackbar"
      >
        <MuiAlert
          elevation={6}
          variant="filled"
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
