import {
  Alert,
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
  CircularProgress,
} from "@mui/material";
import States from "../../data/states.json";

const AddPropertyDialog = ({
  open,
  onClose,
  newProperty,
  onChange,
  onSubmit,
  submitClicked,
  error,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <form onSubmit={onSubmit}>
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <TextField
            required
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
            required
            margin="dense"
            name="type"
            label="Type"
            fullWidth
            variant="standard"
            value={newProperty.type}
            onChange={onChange}
          />
          <TextField
            required
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
              required
              margin="dense"
              name="city"
              label="City"
              variant="standard"
              value={newProperty.city}
              onChange={onChange}
            />
            <FormControl sx={{ m: 1, minWidth: 80, marginRight: 10 }}>
              <InputLabel id="demo-simple-select-helper-label">
                State
              </InputLabel>
              <Select
                required
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
            required
            margin="dense"
            name="zipcode"
            label="Zipcode"
            fullWidth
            variant="standard"
            value={newProperty.zipcode}
            onChange={onChange}
          />
        </DialogContent>
        {submitClicked ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default AddPropertyDialog;
