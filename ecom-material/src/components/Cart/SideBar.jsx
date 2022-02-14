import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";

const SideBar = ({ cart, isEmpty }) => {
  return (
    <>
      <List>
        <ListItem>
          <Typography variant="h5" component="h5">
            Summary
          </Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h5">
            Total items:
          </Typography>
          <Typography variant="h5" component="h5">
            {isEmpty ? 0 : cart.total_items}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h5">
            Total Price:
          </Typography>
          <Typography variant="h5" component="h5">
            {isEmpty ? 0 : cart.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem>
          <Button style={{ display: "block", margin: "0 auto" }} color="success" variant="contained">
            Checkout
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default SideBar;