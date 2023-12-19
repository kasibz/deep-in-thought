import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@mui/material';
import paymentService from '../../utilities/paymentService';
import { useParams } from 'react-router';
import { useEffect } from 'react';

const PaymentHistoryDialog = ({ open, onClose, paymentHistory }) => {
    const { propertyId } = useParams();
    console.log(paymentHistory)
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Payment History</DialogTitle>
            <DialogContent>
                <List>
                    {paymentHistory && paymentHistory.length > 0 ? paymentHistory.map((payment, index) => (
                        <ListItem key={index}>
                        <ListItemText
                            primary={`Amount: $${payment.amount} | Method: ${payment.type}`}
                            secondary={`Date Paid: ${payment.date_paid} | Due: ${payment.date_due
                            } | Resident: ${payment.first_name}, ${payment.last_name}`}
                        />
                    </ListItem>
                    )) : <div>No Payment History</div> }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentHistoryDialog;
