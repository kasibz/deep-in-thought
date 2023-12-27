import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import States from "../../data/states.json";

const AddPropertyDialog = ({
  open,
  onClose,
  newProperty,
  onChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Property</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          variant="standard"
          value={newProperty.name}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="type"
          label="Type"
          fullWidth
          variant="standard"
          value={newProperty.type}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="streetAddress"
          label="Street"
          fullWidth
          variant="standard"
          value={newProperty.streetAddress}
          onChange={onChange}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            margin="dense"
            name="city"
            label="City"
            variant="standard"
            value={newProperty.city}
            onChange={onChange}
          />
          <FormControl sx={{ m: 1, minWidth: 80, marginRight: 10 }}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={newProperty.state}
              name="state"
              label="States"
              onChange={onChange}
            >
              {States.map((state, idx) => {
                return (
                  <MenuItem key={idx} value={state}>
                    {state}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <TextField
          margin="dense"
          name="zipcode"
          label="Zipcode"
          fullWidth
          variant="standard"
          value={newProperty.zipcode}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPropertyDialog;
