import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
};


function NavBar() {
  let userId = 1;

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{bgcolor:"#6b5b95"}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow:1,textAlign:'left'}}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:'right'}}>
            <Link to={{ pathname: "/users/" + userId }} style={linkStyle}>
              User
            </Link>
          </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
