import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e2281b"
    },
    secondary: {
      main: "#0044ff"
    },
    background: {
      paper: "#fff"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Ubuntu", "sans-serif"].join(",")
  }
});

const Theme = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default Theme;
