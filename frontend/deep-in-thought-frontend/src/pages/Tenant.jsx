import { useContext, useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import tenantService from "../utilities/tenantService";
import CreditCardPaymentDialog from "../components/dialogs/CreditCardPaymentDialog";
import RentPaymentDialog from "../components/dialogs/RentPaymentDialog";
import ExistingCreditCardDialog from "../components/dialogs/ExistingCreditCardDialog";
import { UserContext } from "../context/UserContext";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import api from "../utilities/axiosConfig";

const Tenant = () => {
    const { addUser, user } = UserContext()
    const [tenantData, setTenantData] = useState([]);
    const [currentBalance, setCurrentBalance] = useState([]);
    const [creditcardNumber, setCreditCardNumber] = useState(""); 
    const [value, setValue] = React.useState(0);
    const [isCreditCardDialogOpen, setIsCreditCardDialogOpen] = useState(false); 
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false); 
    const [isExistingCreditCardDialogOpen, setIsExistingCreditCardDialogOpen] = useState(false); 

    useEffect(() =>{
        const getTenantData = async() => {
            let response = await api.get(`tenant/${user[0].tenantId}`)
            let data = response.data
            setTenantData(data)
        }
        
        getTenantData()
        }, [])


        // add in contract by ID to display current rent 
        useEffect(() =>{
            const getCurrentBalance = async() => {
                let response = await api.get(`tenant/${user[0].tenantId}/contract`)
                let balanceData = response.data
                setCurrentBalance(balanceData)
            }
            
            getCurrentBalance()
            }, [])

    // const tenantInformation = async () => {
    //     try {
    //         const response = await tenantService.tenantInformation()
    //         console.log(user.data)
    //         console.log(response.data)
            
    //     } catch (error) {
    //         console.log(error)
    //         alert('An error occurred during registration. Fix your shit')
    //     }
    // }




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


    const onClickOpenExistingCreditCardDialog = () => {
        setIsExistingCreditCardDialogOpen(true);
    };

    const onClickCloseExistingCreditCardDialog = () => {
        setIsExistingCreditCardDialogOpen(false);
    };

    return (

        <div>
            {/* Display welcome message for user*/}
            <h1>Welcome {tenantData.firstName} {tenantData.lastName}</h1>
            <div>
                <h3>{tenantData.startDate}</h3>
            </div>
            {/* Display user balance information*/}
            
            <div className="account-balance">
                Current Account Balance: 
                <p>
                <Button variant="outlined" fullWidth onClick={onClickOpenCreditCardDialog}>Add Card</Button>
                <Button variant="outlined" fullWidth onClick={onClickOpenExistingCreditCardDialog}>Pay Rent</Button>
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

            <ExistingCreditCardDialog
                open={isExistingCreditCardDialogOpen}
                onClose={onClickCloseExistingCreditCardDialog}
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