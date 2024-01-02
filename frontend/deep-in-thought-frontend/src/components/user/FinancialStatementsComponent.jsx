import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from '@mui/material';

import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';

export default function FinancialStatementsComponent({ propertiesData }) {

    // calculate subtotal for all payment
    const subtotal = propertiesData.reduce((total, row) => total + row.amount, 0);

    const [sortConfig, setSortConfig] = useState({ field: 'street_address', direction: 'asc' });

    //sort by street name in alphabetical order.
    //useMemo hook is used to optimize the performance of your component by memoizing the sorted data. 
    //useMemo will only runs when propertiesData or sortConfig value changes
    const sortedPropertiesData = useMemo(() => {
        let sortableItems = [...propertiesData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.field] < b[sortConfig.field]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.field] > b[sortConfig.field]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [propertiesData, sortConfig]);

    // update the sorting configuration for a table. 
    // It sets which field the table should be sorted by and the direction of the sort 
    const requestSort = (field) => {
        let direction = 'asc';
        if (sortConfig.field === field && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ field, direction });
    };

    return (
        <TableContainer component={Paper} sx={{maxHeight:540}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortConfig.field === 'street_address'}
                                direction={sortConfig.field === 'street_address' ? sortConfig.direction : 'asc'}
                                onClick={() => requestSort('street_address')}
                            >
                                Property
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Resident</TableCell>
                        <TableCell align="right">Date Due</TableCell>
                        <TableCell align="right">Date Paid</TableCell>
                        <TableCell align="right">Payment Method</TableCell>
                        <TableCell align="right">Amount Paid</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {propertiesData.length > 0 ? (
                        sortedPropertiesData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.street_address}
                                </TableCell>
                                <TableCell align="right">{`${row.first_name}, ${row.last_name}`}</TableCell>
                                <TableCell align="right">{row.date_due}</TableCell>
                                <TableCell align="right">{row.date_paid}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{`$ ${row.amount}`}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                    {propertiesData.length > 0 && (
                        <TableRow>
                            <TableCell colSpan={5} align="right">Subtotal</TableCell>
                            <TableCell align="right">{`$ ${subtotal}`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
