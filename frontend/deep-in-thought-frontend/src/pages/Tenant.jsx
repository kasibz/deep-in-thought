import { useContext, useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import tenantService from "../utilities/tenantService";
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
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TenantAccountComponent from "../components/tenant/TenantAccountComponent";
import TenantHistoryComponent from "../components/tenant/TenantHistoryComponent";
import api from "../utilities/axiosConfig";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
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
  return `${formattedMonth}/${formattedDate}/${year}`;
}

const Tenant = () => {
  const { addUser, user } = UserContext();
  const [open, setOpen] = React.useState(true);
  const [tenantData, setTenantData] = useState([]);
  const [currentBalance, setCurrentBalance] = useState([]);
  const [creditcardNumber, setCreditCardNumber] = useState("");
  const [value, setValue] = React.useState("Home");
  const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false);
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const [isPayByCreditCardDialogOpen, setIsPayByCreditCardDialogOpen] =
    useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState([]);

  const [currentDate, setCurrentDate] = useState(getDate());
  const [rentDate, setRentDate] = useState(rentDueDate());

  useEffect(() => {
    const getTenantData = async () => {
      let response = await api.get(`tenant/${user[0].tenantId}`);
      let data = response.data;
      setTenantData(data);
    };

    getTenantData();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const isFirstDayOfMonth = currentDate.getDate() === 1;

    if (isFirstDayOfMonth) {
      setShowAlert(true);
    }
  }, []);

  // add in contract by ID to display current rent
  useEffect(() => {
    const getCurrentBalance = async () => {
      let response = await api.get(`tenant/${user[0].tenantId}/contract`);
      let paymentData = response.data;
      setCurrentBalance(paymentData);
    };
    console.log(paymentInfo);
    getCurrentBalance();
  }, []);

  //get payments by tenant ID
  useEffect(() => {
    const getPaymentInfo = async () => {
      let response = await api.get(`payment/tenant/${user[0].tenantId}`);
      let balanceData = response.data;

      //if payment date is in table that is the current month
      // then set current balance to 0
      setCurrentBalance(balanceData);
    };

    getPaymentInfo();
  }, []);

  {
    /* GET request for getting user information that is signed in */
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickOpenCreditCardDialog = () => {
    setIsCreditCardDialogOpen(true);
  };

  const onClickCloseCreditCardDialog = () => {
    setIsCreditCardDialogOpen(false);
  };

  const onClickOpenRentPaymentDialog = () => {
    setIsRentDialogOpen(true);
  };

  const onClickCloseRentPaymentDialog = () => {
    setIsRentDialogOpen(false);
  };

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
      <h1>
        Welcome {tenantData.firstName} {tenantData.lastName}
      </h1>
      <h2>Today's Date: {currentDate}</h2>

      {/* Display user balance information*/}
      {value === "Home" ? (
        <>
          <div className="account-balance">
            Current Account Balance:
            <h3>${currentBalance.rent}</h3>
            <h3>Rent Due on: {rentDate}</h3>
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
              {/* <Button variant="outlined" fullWidth onClick={onClickOpenRentPaymentDialog}>Pay Rent</Button> */}
            </p>
          </div>

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
        </>
      ) : value === "Account" && tenantData ? (
        <TenantAccountComponent tenantData={tenantData} />
      ) : (
        <TenantHistoryComponent />
      )}

      <Box sx={{ width: "100%" }}>
        <BottomNavigation
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
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default Tenant;
