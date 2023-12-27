import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
  ListItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMyPropertyContext } from "./../context/PropertyContext";
import AddPropertyDialog from "./dialogs/AddPropertyDialog";
import propertyService from "../utilities/propertyService";
import { UserContext } from "./../context/UserContext";
import SuccessSnackBar from "./snackbar/SuccessSnackBar";

const OwnerPropertyComponent = () => {
  // calling user context
  const { user } = UserContext();

  // navigate hook to allow navigate to different routes
  const navigate = useNavigate();

  // open and close state variable for dialog
  const [open, setOpen] = useState(false);

  // new property state variable
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    ownerId: user[0].ownerId,
  });

  // calling property context state variables
  const { ownerProperties, addOwnerProperty } = useMyPropertyContext();
  //loading variable
  const [isLoading, setIsLoading] = useState(true);

  // get list of owner's list of properties and persist data
  useEffect(() => {
    const getOwnerProperties = async () => {
      try {
        const response = await propertyService.getAllPropertiesByIdForOwner(
          user[0].ownerId
        );
        // console.log(response)
        if (response.status === 200) {
          addOwnerProperty(response.data);
        }
        setIsLoading(false); // Set loading to false once data has bee fetched
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading to false once data has bee fetched
      }
    };
    getOwnerProperties();
  }, [open]); // whenever there is a change in this variable, this useEffect will be triggered.

  const onClickOpenDialog = () => {
    // Open the dialog
    setOpen(true);
  };

  const onClickCloseDialog = () => {
    // Close the dialog
    setOpen(false);
  };

  const onClickProperty = (property) => {
    console.log(property);
    navigate(`/property/${property.id}`);
  };

  const onChangeAddPropertyTextField = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  //snack bar state variables
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //snack bar on close function
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmitAddProproperty = async () => {
    console.log(newProperty);
    try {
      const addPropertyResponse = await propertyService.addProperty(
        newProperty
      );
      console.log(addPropertyResponse);
      if (addPropertyResponse.status === 201) {
        //snack bar message
        setSnackbarMessage("Property added successfully!");
        //set true to open snack bar
        setSnackbarOpen(true);
        // close dialog
        setOpen(false);
      } else {
        alert("something is wrong. This need to be changed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // display none when loading variable is true
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className="container" sx={{ width: "600px", minWidth: "100px" }}>
      <List
        className="general-box"
        sx={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <ListItem>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              gap: 6,
            }}
          >
            <Typography variant="h4">My properties</Typography>
            <Button
              size="small"
              onClick={onClickOpenDialog}
              variant="contained"
            >
              Add Property
            </Button>
          </Box>
        </ListItem>
        {ownerProperties && ownerProperties.length > 0 ? (
          ownerProperties.map((property, index) => (
            <Box key={property.id}>
              <ListItemButton onClick={() => onClickProperty(property)}>
                <ListItemText
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  primary={
                    <Typography variant="h6">
                      {`Property : ${property.name}`}
                    </Typography>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        Type: {property.type}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        Address: {property.streetAddress} {property.city}{" "}
                        {property.state} {property.zipcode}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
              {index !== ownerProperties.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <div>
            You currently have no properties listed. Click here to add your
            first property
          </div>
        )}
      </List>

      {/* Add Property Dialog */}
      <AddPropertyDialog
        open={open}
        onClose={onClickCloseDialog}
        newProperty={newProperty}
        onChange={onChangeAddPropertyTextField}
        onSubmit={onSubmitAddProproperty}
      />
      <SuccessSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default OwnerPropertyComponent;
