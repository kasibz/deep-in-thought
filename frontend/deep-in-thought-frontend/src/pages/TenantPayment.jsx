import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TenantPayment = () => {

    const [payment, setPayment] = React.useState('');

    const handleChange = (event) => {
        setPayment(event.target.value);
      };

      console.log("Payment: " + payment)
    return (
        <div>

        <Box sx={{ maxWidth: 400 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={payment}
            label="Payment Type"
            onChange={handleChange}
            >
          <MenuItem value={'creditcard'}>Credit Card</MenuItem>
         
            </Select>
        </FormControl>
    </Box>
        <div>
             {
                payment 
                

            }

        </div>
        
        
        
            
    </div>
    )
}
export default TenantPayment