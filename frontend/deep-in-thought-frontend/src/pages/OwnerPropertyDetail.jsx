import { Button, Card, CardContent, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PaymentHistoryDialog from "../components/dialogs/PaymentHistoryDialog";
import ResidentInformationDialog from "../components/dialogs/ResidentInformationDialog";
const mockPaymentHistory = [
    {
        datePaid: "2023-01-15",
        dateDue: "2023-01-10",
        amount: 1200,
        method: "Credit Card",
        residentName: "John Doe"
    },
    {
        datePaid: "2023-02-15",
        dateDue: "2023-02-10",
        amount: 1200,
        method: "Bank Transfer",
        residentName: "Jane Smith"
    },
];
const mockResidentInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890"
};

const OwnerPropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [isPaymentHistoryDialogOpen, setIsPaymentHistoryDialogOpen] = useState(false);
    const [isResidentInfoDialogOpen, setIsResidentInfoDialogOpen] = useState(false);

    console.log(id)
    // Mock data
    const paymentHistory = mockPaymentHistory; // Replace with actual data fetching in production
    const residentInfo = mockResidentInfo; // Replace with actual data fetching in production

    // ... existing functions ...
    useEffect(() => {
        // Fetch the property data based on the ID
        const fetchProperty = async () => {
            const data = await getPropertyData(id);
            setProperty(data);
        };

        fetchProperty();
    }, [id]);

    // Placeholder function
    const getPropertyData = async (propertyId) => {
        return {
            id: propertyId,
            name: 'Sample Property',
            type: 'Condo',
            address: '123 Sample Street'
        };
    };

    const onClickAddResident = () => {

    };

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
    
    
    // If there is no property information, then display loading...
    if (!property) return <div>Loading...</div>;

    return (
        <Container>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h5">{property.name}</Typography>
                    <Typography>Type: {property.type}</Typography>
                    <Typography>Address: {property.address}</Typography>
                </CardContent>
            </Card>

            <Button variant="outlined" fullWidth onClick={onClickAddResident}>
                Add Resident
            </Button>

            <Button variant="outlined" fullWidth onClick={onClickOpenPaymentHistoryDialog} sx={{ mt: 2 }}>
                View Payment History
            </Button>

            <Button variant="outlined" fullWidth onClick={onClickOpenResidentDialog} sx={{ mt: 2 }}>
                View Resident Information
            </Button>

            {/* Dialogs */}
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