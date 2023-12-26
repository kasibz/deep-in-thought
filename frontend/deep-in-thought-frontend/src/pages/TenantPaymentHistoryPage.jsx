import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import paymentService from '../utilities/paymentService';
import { UserContext } from '../context/UserContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

//helper function to mask all but last 4 digits
const maskCardNumber = (cardNumber) => {
  return `${'x'.repeat(String(cardNumber).length - 4)}${String(cardNumber).slice(-4)}`;
};

const TenantPaymentHistoryPage = () => {

  const [paymentHistory, setPaymentHistory] = React.useState('');
  const { user } = UserContext()
  useEffect(() => {
    const getPaymentTenantHistory = async () => {
      try {
        let response = await paymentService.getAllPaymnetHistoryByTenantId(user[0].tenantId)
        let balanceData = response.data;
        setPaymentHistory(balanceData)

      } catch (error) {
        console.log(error)
      }
    };

    getPaymentTenantHistory();
  }, []);

  return (
    <>
      {paymentHistory && <TableContainer component={Paper}>
        <Table aria-label="tenant payment history">
          <TableHead>
            <TableRow>
              <TableCell>Date Paid</TableCell>
              <TableCell align="right">Amount Due</TableCell>
              <TableCell align="right">Amount Paid</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Card Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory.map((payment, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {payment.date_paid}
                </TableCell>
                <TableCell align="right">{`$${payment.rent_due}`}</TableCell>
                <TableCell align="right">{`$${payment.amount_paid}`}</TableCell>
                <TableCell align="right">{payment.type}</TableCell>
                <TableCell align="right">{maskCardNumber(payment.card_number)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </>
  );
}
export default TenantPaymentHistoryPage