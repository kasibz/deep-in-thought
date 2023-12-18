import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';

const ResidentInformationDialog = ({ open, onClose, residentInfo }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Resident Information</DialogTitle>
            <DialogContent>
                <Typography variant="body1">First Name: {residentInfo.firstName}</Typography>
                <Typography variant="body1">Last Name: {residentInfo.lastName}</Typography>
                <Typography variant="body1">Email: {residentInfo.email}</Typography>
                <Typography variant="body1">Phone Number: {residentInfo.phone}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResidentInformationDialog;
