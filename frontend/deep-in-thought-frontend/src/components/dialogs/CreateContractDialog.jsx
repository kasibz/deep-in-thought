import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import tenantService from '../../utilities/tenantService';
import contractService from '../../utilities/contractService';
import { useParams } from 'react-router';


// const residents=[{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Smith' }]

const CreateContractDialog = ({ open, onClose }) => {
    const { propertyId } = useParams();
    const [contractInfo, setContractInfo] = useState({
        length: '',
        startDate: '',
        stopDate: '',
        rent: ''
    })

    const [residents, setResidents] = useState([]);
    //resident Id from selection
    const [selectedTenantId, setSelectedTenantId] = useState('');

    //loading variable 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAllTenant = async () => {
            try {
                const response = await tenantService.getAllTenant()
                if (response.status === 200) {
                    setResidents(response.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllTenant()
    }, [])

    const onChangeResidentOption = (e) => {
        setSelectedTenantId(e.target.value);
    };

    const onChangeContractInfo = (e) =>{
        const {name, value} = e.target;
        // change str into Number type
        const updatedValue = (name === 'rent' || name === 'length') ? Number(value) : value;
        setContractInfo(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    }

    const onSubmitContract = async (e) => {
        e.preventDefault();
        try {
            const createContractResponse = await contractService.createContract(contractInfo)
            if(createContractResponse.status === 201){
                console.log(createContractResponse)
                const contractId = createContractResponse.data.id;
                const propertyAndContractIdObj = {
                    propertyId:propertyId,
                    contractId: contractId
                }
                const updateTenantResponse = await tenantService.updateTenantInfo(selectedTenantId, propertyAndContractIdObj);
                console.log(updateTenantResponse)
                if (updateTenantResponse.status === 200){
                    alert('successfully created contract and updated tenant table with proper propertId and contractId')
                    onClose()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <div></div>;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={onSubmitContract}>
                <DialogTitle>Contract Submission</DialogTitle>
                <DialogContent>
                    {residents && residents.length > 0 && (
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="resident-select-label">Resident</InputLabel>
                            <Select
                                labelId="resident-select-label"
                                id="resident-select"
                                value={selectedTenantId}
                                label="Resident"
                                onChange={onChangeResidentOption}
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
                        onChange={onChangeContractInfo}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        name="stopDate"
                        label="Contract End Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={onChangeContractInfo}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        name="length"
                        label="Contract Length (Months)"
                        fullWidth
                        variant="standard"
                        onChange={onChangeContractInfo}
                    />
                    <TextField
                        margin="dense"
                        name="rent"
                        label="Monthly Payment Amount"
                        fullWidth
                        variant="standard"
                        onChange={onChangeContractInfo}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='submit'>Submit Contract</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CreateContractDialog