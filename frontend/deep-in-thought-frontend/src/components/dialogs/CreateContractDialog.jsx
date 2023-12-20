import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import tenantService from '../../utilities/tenantService';


// const residents=[{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Smith' }]

const CreateContractDialog = ({ open, onClose }) => {

    const [selectedResident, setSelectedResident] = useState('');
    const [residents, setResidents] = useState([])

    useEffect(() => {
        const getAllTenant = async () => {
            try {
                const response = await tenantService.getAllTenant()
                console.log(response)
                if(response.status === 200){
                    setResidents(response.data)
            }
            } catch (error) {
                console.log(error)
            }
        }
        getAllTenant()
    },[])

    const handleResidentChange = (event) => {
        setSelectedResident(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Contract Submission</DialogTitle>
            <DialogContent>
            {residents && residents.length > 0 && (
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="resident-select-label">Resident</InputLabel>
                        <Select
                            labelId="resident-select-label"
                            id="resident-select"
                            value={selectedResident}
                            label="Resident"
                            onChange={handleResidentChange}
                        >
                            {residents.map((resident) => (
                                <MenuItem key={resident.id} value={resident.id}>
                                    {`${resident.firstName}, ${resident.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <TextField
                    margin="dense"
                    name="startDate"
                    label="Contract Start Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    margin="dense"
                    name="endDate"
                    label="Contract End Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    margin="dense"
                    name="contractLength"
                    label="Contract Length (Months)"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="monthlyAmount"
                    label="Monthly Payment Amount"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => { }}>Submit Contract</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateContractDialog