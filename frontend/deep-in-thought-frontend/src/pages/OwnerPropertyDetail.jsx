import { Box, Button, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PaymentHistoryDialog from "../components/dialogs/PaymentHistoryDialog";
import ResidentInformationDialog from "../components/dialogs/ResidentInformationDialog";
import propertyService from "../utilities/propertyService";
import paymentService from "../utilities/paymentService";
import tenantService from "../utilities/tenantService";
import CreateContractDialog from "../components/dialogs/CreateContractDialog";

const OwnerPropertyDetail = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);

    const [isPaymentHistoryDialogOpen, setIsPaymentHistoryDialogOpen] = useState(false);
    const [isResidentInfoDialogOpen, setIsResidentInfoDialogOpen] = useState(false);
    const [isCreateContractDialogOpen, setIsCreateContractDialogOpen] = useState(false);

    //loading variable 
    const [isLoading, setIsLoading] = useState(true);

    const [paymentHistory, setPaymentHistory] = useState([])
    const [residentInfo, setResidentInfo] = useState([])
    useEffect(() => {
        // Fetch the property data based on the ID
        const fetchProperty = async () => {
            try {
                const response = await propertyService.getPropertyByIdForOwner(propertyId);
                if (response.status === 200) {
                    setProperty(response.data);
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        };

        fetchProperty();

        // get payment history information
        const requestPaymentHistory = async () => {
            try {
                const response = await paymentService.getPaymentHistory(propertyId);
                if (response.status === 200) {
                    setPaymentHistory(response.data)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        };

        requestPaymentHistory();

        //get resident information by property
        const requestResidentInformationByProperty = async () => {
            try {
                const response = await tenantService.getTenantByProperty(propertyId)
                if (response.status === 200) {
                    setResidentInfo(response.data[0]) // This need to be changed if there are more than one resident. Save as response.data
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        requestResidentInformationByProperty()
    }, [propertyId]);

    const onClickOpenCreateContractDialog = () => {
        setIsCreateContractDialogOpen(true)
    }

    const onClickCloseCreateContractDialog = () => {
        setIsCreateContractDialogOpen(false)
    }

    const onClickOpenPaymentHistoryDialog = () => {
        setIsPaymentHistoryDialogOpen(true);
    };

    const onClickClosePaymentHistoryDialog = () => {
        setIsPaymentHistoryDialogOpen(false);
    };

    const onClickOpenResidentDialog = () => {
        setIsResidentInfoDialogOpen(true);
    };

    const onClickCloseResidentDialog = () => {
        setIsResidentInfoDialogOpen(false);
    };

    // display none when loading variable is true
    if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        );
      }

    return (
        <Container>
            <Card variant="outlined" sx={{ mb: 2 }}>
                {property && <CardContent>
                    <Typography variant="h5">{property.name}</Typography>
                    <Typography>Type: {property.type}</Typography>
                    <Typography>Street: {property.streetAddress}</Typography>
                    <Typography>City: {property.city}</Typography>
                    <Typography>State: {property.state}</Typography>
                    <Typography>Zipcode: {property.zipcode}</Typography>
                </CardContent>}
            </Card>
            {!residentInfo && <Button variant="outlined" fullWidth onClick={onClickOpenCreateContractDialog}>
            Create Contract
            </Button>}

            <Button variant="outlined" fullWidth onClick={onClickOpenResidentDialog} sx={{ mt: 2 }}>
                View Resident Information
            </Button>

            <Button variant="outlined" fullWidth onClick={onClickOpenPaymentHistoryDialog} sx={{ mt: 2 }}>
                View Payment History
            </Button>

            {/* Dialogs */}
            <CreateContractDialog
                open={isCreateContractDialogOpen} 
                onClose={onClickCloseCreateContractDialog}
            />
            <PaymentHistoryDialog
                open={isPaymentHistoryDialogOpen}
                onClose={onClickClosePaymentHistoryDialog}
                paymentHistory={paymentHistory}
            />
            <ResidentInformationDialog
                open={isResidentInfoDialogOpen}
                onClose={onClickCloseResidentDialog}
                residentInfo={residentInfo}
            />
        </Container>
    )
}

export default OwnerPropertyDetail