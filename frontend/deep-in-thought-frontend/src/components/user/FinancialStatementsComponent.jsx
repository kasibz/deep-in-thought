import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(first_name, date_due, date_paid, amount) {
    return {
        first_name, date_due, date_paid, amount
    };
}

export default function FinancialStatementsComponent({ propertiesData }) {
    console.log('propertiesData: ', propertiesData)

    //Function to calculate total amount paid
    const subtotal = propertiesData.reduce((total, row) => total + row.amount, 0);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align="right">Date Due</TableCell>
                        <TableCell align="right">Date Paid</TableCell>
                        <TableCell align="right">Amount Paid</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {propertiesData.map((row) => (
                        <TableRow
                            key={row.first_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.first_name}
                            </TableCell>
                            <TableCell align="right">{row.date_due}</TableCell>
                            <TableCell align="right">{row.date_paid}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                                        <TableRow>
                        <TableCell colSpan={3} align="right">Subtotal</TableCell>
                        <TableCell align="right">{subtotal}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
