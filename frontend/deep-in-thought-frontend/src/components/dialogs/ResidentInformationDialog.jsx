import { Dialog, DialogContent, Typography, DialogActions, Button, Box, Divider } from '@mui/material';

const ResidentInformationDialog = ({ open, onClose, residentInfo }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {residentInfo && (residentInfo.firstName || residentInfo.lastName || residentInfo.email || residentInfo.phone) ? (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" color="primary.main">
                            Resident Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>First Name:</strong> {residentInfo.firstName}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Last Name:</strong> {residentInfo.lastName}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Email:</strong> {residentInfo.email}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Phone Number:</strong> {residentInfo.phoneNumber}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                        No resident information available.
                    </Typography>
                )}
            </DialogContent>



            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResidentInformationDialog;
