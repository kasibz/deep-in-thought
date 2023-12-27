import { useEffect, useState } from 'react';
import paymentService from '../utilities/paymentService';
import { UserContext } from '../context/UserContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';

//helper function to mask all but last 4 digits
const maskCardNumber = (cardNumber) => {
  return `${'x'.repeat(String(cardNumber).length - 4)}${String(cardNumber).slice(-4)}`;
};

const TenantPaymentHistoryPage = () => {

  const [paymentHistory, setPaymentHistory] = useState('');
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
    <div className='container'>
      {paymentHistory && paymentHistory.length > 0 ? <TableContainer component={Paper}>
        <Table aria-label="tenant payment history">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6">
                  Payment History
                </Typography>
              </TableCell>
            </TableRow>
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
      </TableContainer> : <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>}
    </div>
  );
}
export default TenantPaymentHistoryPage