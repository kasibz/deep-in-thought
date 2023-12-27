import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, DialogActions, Button, Typography } from '@mui/material';

const OwnerPaymentHistoryDialog = ({ open, onClose, paymentHistory }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Payment History</DialogTitle>
            <DialogContent>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {paymentHistory && paymentHistory.length > 0 ? paymentHistory.map((payment, index) => (
                        <ListItem key={index} sx={{ my: 1, py: 2, px: 2, border: 1, borderColor: 'divider', borderRadius: '4px', boxShadow: 1, '&:hover': { bgcolor: 'grey.100' } }}>
                            <ListItemText
                                primary={`Amount: $${payment.amount} | Method: ${payment.type}`}
                                secondary={`Date Paid: ${payment.date_paid} | Due: ${payment.date_due} | Resident: ${payment.first_name}, ${payment.last_name}`}
                                primaryTypographyProps={{ fontWeight: 'fontWeightMedium', color: 'primary.main' }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
                        </ListItem>
                    )) : (
                        <Typography variant="subtitle1" sx={{ my: 2, textAlign: 'center', color: 'text.secondary' }}>
                            No Payment History
                        </Typography>
                    )}
                </List>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OwnerPaymentHistoryDialog;
