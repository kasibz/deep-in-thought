import { useContext, useState, useEffect } from "react";
// import { UserContextProvider } from "../App";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities"; 
import * as React from 'react';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';


const Tenant = () => {

    // const { user } = useContext(UserContextProvider); 
    // const [value, setValue] = React.useState('recents');
    const [value, setValue] = React.useState(0);


    {/* GET request for getting user information that is signed in */}

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <Link to='/tenantPayment'><Button variant="outlined">Make Payment</Button></Link>
                </p>
            </div>


            {/* Navigate to payment page*/}

            
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
                    <BottomNavigationAction label="Payment" icon={<AttachMoneyOutlinedIcon />} />
                </BottomNavigation>
            </Box>    
        </div>
    )
    }
    
    export default Tenant