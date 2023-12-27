import { Dialog, DialogContent, Typography, DialogActions, Button, Box, Divider } from '@mui/material';

const ResidentInformationDialog = ({ open, onClose, residentInfo }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {residentInfo && (residentInfo.firstName || residentInfo.lastName || residentInfo.email || residentInfo.phone) ? (
                    <Box sx={{ width: '400px', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6" color="primary.main">
                                Resident Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>First Name:</strong> {residentInfo.first_name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Last Name:</strong> {residentInfo.last_name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {residentInfo.email}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Phone Number:</strong> {residentInfo.phone_number}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Start Date:</strong> {residentInfo.start_date}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>End Date:</strong> {residentInfo.stop_date}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Contract Length:</strong> {residentInfo.length}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Rent:</strong> {residentInfo.rent}
                            </Typography>
                        </Box>
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
