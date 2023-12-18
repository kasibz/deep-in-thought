import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@mui/material';

const PaymentHistoryDialog = ({ open, onClose, paymentHistory }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Payment History</DialogTitle>
            <DialogContent>
                <List>
                    {paymentHistory.map((payment, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={`Amount: $${payment.amount} | Method: ${payment.method}`}
                                secondary={`Date Paid: ${payment.datePaid} | Due: ${payment.dateDue} | Resident: ${payment.residentName}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentHistoryDialog;
