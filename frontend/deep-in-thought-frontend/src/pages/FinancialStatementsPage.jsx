import { useEffect, useState } from "react"
import FinancialStatementsComponent from "../components/user/FinancialStatementsComponent"
import paymentService from "../utilities/paymentService"
import { UserContext } from "../context/UserContext";
import { Box, CircularProgress } from "@mui/material";

const FinancialStatementsPage = () => {
    const [propertiesData, setPropertiesData] = useState()

    const { user } = UserContext();
    const onwerId = user[0].ownerId

    // get all payment history for owner
    useEffect(() => {
        const getAllPaymentHistoryForOwner = async () => {
            try {
                const response = await paymentService.getAllPaymentsByOwnerId(onwerId)
                if (response.status === 200) {
                    setPropertiesData(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllPaymentHistoryForOwner()
    }, [])

    return (
        <div className="container">
            {propertiesData ? (
                <FinancialStatementsComponent propertiesData={propertiesData} />
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            )}
        </div>
    )
}

export default FinancialStatementsPage