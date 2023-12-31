import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CreditCardPaymentDialog from "../components/dialogs/CreditCardPaymentDialog";
import PayByCreditCardDialog from "../components/dialogs/PayByCreditCardDialog";
import { UserContext } from "../context/UserContext";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import api from "../utilities/axiosConfig";
import paymentService from "./../utilities/paymentService";
import { CircularProgress, Typography } from "@mui/material";


const Tenant = () => {
  const { user } = UserContext();
  const [open, setOpen] = useState(true);
  const [tenantData, setTenantData] = useState([]);
  const [currentContract, setCurrentContract] = useState([]);
  const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false);
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const [isPayByCreditCardDialogOpen, setIsPayByCreditCardDialogOpen] =
    useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //Payment History by tenantId
  const [existingPayments, setExistingPayments] = useState([]);
  //Payment due state variables
  const [paymentDueInfo, setPaymentDueInfo] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [rentDate, setRentDate] = useState("");

  // the component starts with the assumption that it's loading data, 
  // and only after the data is fetched (or fails to fetch) will it update the loading state accordingly.
  const [isLoading, setIsloading] = useState(true);

  // helper functions
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    setCurrentDate(`${month}/${date}/${year}`);
  }

  function rentDueDate() {
    const today = new Date();
    let month = today.getMonth() + 2;
    const year = today.getFullYear() + 1;
    let date = 1;

    const formattedDate = date < 10 ? `0${date}` : date;
    // Adjust the month if it's greater than 11
    if (month > 11) {
      month = month % 12; // Get the remainder after dividing by 12
    }

    // Convert month to a string with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : month;
    setRentDate(`${formattedMonth}/${formattedDate}/${year}`);
  }

  // api requests
  useEffect(() => {
    const getTenantData = async () => {
      let response = await api.get(`tenant/${user[0].tenantId}`);
      let data = response.data;
      setTenantData(data);
    };
    getTenantData();
  }, [user]);

  useEffect(() => {
    const currentDate = new Date();
    const isFirstDayOfMonth = currentDate.getDate() === 1;

    if (isFirstDayOfMonth) {
      setShowAlert(true);
    }
  }, []);

  // add in contract by ID to display current rent
  useEffect(() => {
    getDate();
    rentDueDate();
    const getCurrentBalance = async () => {
      try {
        let response = await api.get(`tenant/${user[0].tenantId}/contract`);
        let paymentData = response.data;
        //set contract info
        setCurrentContract(paymentData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false)
      }
    };

    getCurrentBalance();
  }, [user]);

  //get payments by tenant ID
  useEffect(() => {
    const getPaymentInfo = async () => {
      try {
        let response = await api.get(`payment/tenant/${user[0].tenantId}`);
        setExistingPayments(response.data);
        // so now amount_paid and rent_due are in existingPayments
        // order the data by date_paid??
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentInfo();
  }, [user]);

  const onClickOpenCreditCardDialog = () => {
    setIsCreditCardDialogOpen(true);
  };

  const onClickCloseCreditCardDialog = () => {
    setIsCreditCardDialogOpen(false);
  };

  const onClickOpenPayByCreditCardDialog = () => {
    setIsPayByCreditCardDialogOpen(true);
  };

  const onClickClosePayByCreditCardDialog = () => {
    setIsPayByCreditCardDialogOpen(false);
  };

  return (
    <div className="tenant-container">
      <header>
        {showAlert && (
          <div className="alert">
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Collapse in={open}>
                <Alert
                  severity="warning"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Rent Due!
                </Alert>
              </Collapse>
            </Stack>
          </div>
        )}
      </header>
      <div className="general-box">
        {/* Display welcome message for user*/}
        {tenantData.firstName ? (
          <Box sx={{ border: 1, borderRadius: '10px', m:1, p:2}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
            Welcome {tenantData.firstName} {tenantData.lastName}
          </Typography>
          </Box>
        ) : (
          <CircularProgress />
        )}

        {/* Display user balance information*/}
        {/* If there is no contract, then display no balance due*/}
        {isLoading ? (
          <CircularProgress />
        ) : currentContract && currentContract.rent ? (
          <>
            
            <Typography sx={{ m:5}}>Today&apos;s Date: {currentDate} </Typography>
            <div className="account-balance">
              {existingPayments[existingPayments.length - 1]?.date_paid ? (
                <>
                  <Typography sx={{m:1}}>
                    Current Account Rent Due: $
                    {existingPayments[existingPayments.length - 1].rent_due -
                      existingPayments[existingPayments.length - 1].amount_paid}
                  </Typography>
                  <Typography sx={{color:"green", m:1}}>
                    Payment received on{" "}
                    {existingPayments[existingPayments.length - 1].date_paid}{" "}
                    Thank You!
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={{m:1}}>Current Account Rent Due: ${currentContract.rent}</Typography>
                  <Typography sx={{m:1}}>Rent Due on: {rentDate}</Typography>
                </>
              )}
              <Typography sx={{m:5}}>
                Number of months remaining for payment: {Math.max(0, currentContract.length)}
              </Typography>
              <p>
                <Box
                  display="flex"
                  width={500}
                  justifyContent="space-around" // Add border for visualization
                  margin={2}
                  paddingTop={2} // Add padding for visualization
                >
                  <Button
                    variant="outlined"
                    onClick={onClickOpenCreditCardDialog}
                    style={{ width: "200px" }}
                  >
                    Add Card
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onClickOpenPayByCreditCardDialog}
                    style={{ width: "200px" }}
                  >
                    Pay Rent
                  </Button>
                </Box>
              </p>
            </div>
          </>
        ) : (
          <Box>
            <Typography variant="h6">Not assigned to any property.</Typography>
            <Typography variant="h6">Please Contact your property manager.</Typography>
          </Box>
        )}
      </div>
      <CreditCardPaymentDialog
        open={isCreditCardDialogOpen}
        onClose={onClickCloseCreditCardDialog}
      />

      <PayByCreditCardDialog
        open={isPayByCreditCardDialogOpen}
        onClose={onClickClosePayByCreditCardDialog}
      />
    </div>
  );
};

export default Tenant;
