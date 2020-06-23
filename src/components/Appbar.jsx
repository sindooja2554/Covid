import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton, Button } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Appbar.scss";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body1: {
        "font-size": "2rem",
      },
    },
  },
});

export class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleMenu = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar className="toolbar">
              <div className="logo">
                <img
                  src={require("../covid.png")}
                  className="App-logo"
                  alt="logo"
                />
                <Typography>COVID19</Typography>
              </div>
              <div className="button">
                <IconButton className="button">
                  <HelpOutlineIcon />
                </IconButton>
                <Button
                  className="button"
                  onClick={(event) => this.handleMenu(event)}
                >
                  Contact Us
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    Email: covidhelpdesk@gmail.com
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    Phone: +91 9087654321
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    Twitter: https://twitter.com/covid19
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Appbar;
