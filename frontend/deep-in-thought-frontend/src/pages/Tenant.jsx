import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CreditCardPaymentDialog from "../components/dialogs/CreditCardPaymentDialog";
import RentPaymentDialog from "../components/dialogs/RentPaymentDialog";
import PayByCreditCardDialog from "../components/dialogs/PayByCreditCardDialog";
import { UserContext } from "../context/UserContext";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import api from "../utilities/axiosConfig";
import paymentService from "./../utilities/paymentService";
import { CircularProgress } from "@mui/material";

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
        console.log(response.data);
        setCurrentContract(paymentData);
      } catch (error) {
        console.log(error);
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
        console.log(response.data);
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

  // const onClickOpenRentPaymentDialog = () => {
  //   setIsRentDialogOpen(true);
  // };

  // const onClickCloseRentPaymentDialog = () => {
  //   setIsRentDialogOpen(false);
  // };

  const onClickOpenPayByCreditCardDialog = () => {
    setIsPayByCreditCardDialogOpen(true);
  };

  const onClickClosePayByCreditCardDialog = () => {
    setIsPayByCreditCardDialogOpen(false);
  };

  return (
    <div>
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

      {/* Display welcome message for user*/}
      {tenantData.firstName ? (
        <h1>
          Welcome {tenantData.firstName} {tenantData.lastName}
        </h1>
      ) : (
        <CircularProgress />
      )}

      {/* Display user balance information*/}
      {/* If there is no contract, then display no balance due*/}
      {currentContract.rent ? (
        <>
          <h2>Today&apos;s Date: {currentDate}</h2>
          <div className="account-balance">
            {existingPayments[existingPayments.length - 1]?.date_paid ? (
              <>
                <h3>
                  Current Account Rent Due: $
                  {existingPayments[existingPayments.length - 1].rent_due -
                    existingPayments[existingPayments.length - 1].amount_paid}
                </h3>
                <h3 className="payment-received">
                  Payment received on{" "}
                  {existingPayments[existingPayments.length - 1].date_paid}{" "}
                  Thank You!
                </h3>
              </>
            ) : (
              <>
                <h3>Current Account Rent Due: ${currentContract.rent}</h3>
                <h3>Rent Due on: {rentDate}</h3>
              </>
            )}
            <h3>
              Number of months remaining for payment: {currentContract.length}
            </h3>

            <p>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClickOpenCreditCardDialog}
              >
                Add Card
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClickOpenPayByCreditCardDialog}
              >
                Pay Rent
              </Button>
            </p>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
      <CreditCardPaymentDialog
        open={isCreditCardDialogOpen}
        onClose={onClickCloseCreditCardDialog}
      />

      {/* <RentPaymentDialog
                    open={isRentDialogOpen}
                    onClose={onClickCloseRentPaymentDialog}
                    /> */}

      <PayByCreditCardDialog
        open={isPayByCreditCardDialogOpen}
        onClose={onClickClosePayByCreditCardDialog}
      />

      <Box sx={{ width: "100%" }}>
        {/* <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="Home"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Account"
            value="Account"
            icon={<PermIdentityOutlinedIcon />}
          />
          <BottomNavigationAction
            label="History"
            value="History"
            icon={<ReceiptLongOutlinedIcon />}
          />
        </BottomNavigation> */}
      </Box>
    </div>
  );
};

export default Tenant;
