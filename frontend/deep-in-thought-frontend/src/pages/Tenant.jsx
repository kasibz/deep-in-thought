import { useContext, useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';

import CreditCardPaymentDialog from "../components/dialogs/CreditCardPaymentDialog";
import RentPaymentDialog from "../components/dialogs/RentPaymentDialog";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';


const Tenant = () => {

    const [value, setValue] = React.useState(0);
    const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false); 
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false); 

    const [paymentInformation, setPaymentInformation] = useState({
        name:"",
        creditNumber: "",
        streetAddress: "",
        cvv: "",
        city:"",
        state:"",
        zip:""
    })


    {/* GET request for getting user information that is signed in */}

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

    return (

        <div>
            {/* Display welcome message for user*/}
            <h1>Welcome User</h1>

            {/* Display user balance information*/}

            

            {/* Display tenant custom nav bar 
                - Navigate to user account info
                - Payment
                - Payment history 
            
            */}
            
            <div>
                Current Account Balance: 
                <p>$0.00
                <Button variant="outlined" fullWidth onClick={onClickOpenCreditCardDialog}>Add Payment Type</Button>
                <Button variant="outlined" fullWidth onClick={onClickOpenRentPaymentDialog}>Pay Rent</Button>
                </p>
            </div>

            <CreditCardPaymentDialog
                open={isCreditCardDialogOpen}
                onClose={onClickCloseCreditCardDialog}
                />

            <RentPaymentDialog
                open={isRentDialogOpen}
                onClose={onClickCloseRentPaymentDialog}
                />

            
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction label="Account" icon={<PermIdentityOutlinedIcon />} />
                    <BottomNavigationAction label="History" icon={<ReceiptLongOutlinedIcon />} />
                </BottomNavigation>
            </Box>    
        </div>
    )
    }
    
    export default Tenant