import { Box, Button, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OwnerPaymentHistoryDialog from "../components/dialogs/OwnerPaymentHistoryDialog";
import ResidentInformationDialog from "../components/dialogs/ResidentInformationDialog";
import propertyService from "../utilities/propertyService";
import paymentService from "../utilities/paymentService";
import tenantService from "../utilities/tenantService";
import CreateContractDialog from "../components/dialogs/CreateContractDialog";
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import TextField from '@mui/material/TextField';


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
                if (response.status === 200 && response.data.length == 0) {
                    setResidentInfo(response.data[0])
                    // This need to be changed if there are more than one resident. Save as response.data
                }else {
                    const contractResponse = await tenantService.getTenantContractInformation(response.data[0].id)
                    setResidentInfo(contractResponse.data)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        requestResidentInformationByProperty()
    }, [propertyId, isCreateContractDialogOpen]); // trigger when there is a change in value

    // display none when loading variable is true
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container className="container" sx={{ width: '800px', alignContent: 'center' }}>
          
            <Card variant="outlined" sx={{ m: 2, p: 2, boxShadow: 2}}>
                {property && (
                    <CardContent sx={{ m: 2, p: 2}}>
                        <Box sx={{ border: 1, borderRadius: '10px', m:1, p:2}}>
                        <HomeWorkTwoToneIcon />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {property.name}
                        </Typography>
                        <Typography variant="h10" >Type: {property.type}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent:'center' }}>
                                    <Box sx={{'& .MuiTextField-root': {width: '150px', m:2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}}>
                                <div>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="street address"
                                        variant="standard"
                                        defaultValue={property.streetAddress}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="city"
                                        variant="standard"
                                        defaultValue={property.city}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                                        <TextField
                                        id="outlined-read-only-input"
                                        label="state"
                                        variant="standard"
                                        defaultValue={property.state}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                                        <TextField
                                        id="outlined-read-only-input"
                                        label="zipcode"
                                        variant="standard"
                                        defaultValue={property.zipcode}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                                </div>
                                {/* <Typography variant="h6" >Street: {property.streetAddress}</Typography>
                                <Typography variant="h6" >City: {property.city}</Typography>
                                <Typography variant="h6" >State: {property.state}</Typography>
                                <Typography variant="h6" >Zipcode: {property.zipcode}</Typography> */}
                           
                            </Box>
                            
                        </Box>
                    </CardContent>
                )}
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    {!residentInfo && (
                        <Button variant="contained" size="small" onClick={onClickOpenCreateContractDialog}>
                            Create Contract
                        </Button>
                    )}
                    <Button variant="contained" size="small" onClick={onClickOpenResidentDialog}>
                        View Resident Information
                    </Button>

                    <Button variant="contained" size="small" onClick={onClickOpenPaymentHistoryDialog}>
                        View Payment History
                    </Button>
                </Box>
            </Card>

            {/* Dialogs */}
            <CreateContractDialog
                open={isCreateContractDialogOpen}
                onClose={onClickCloseCreateContractDialog}
            />
            <OwnerPaymentHistoryDialog
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