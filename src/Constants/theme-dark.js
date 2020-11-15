import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      paper: "#232b3e",
      default: "#1a202e",
      table: "#fff"
    },
    header: {
      collapseBackground: "#171d29",
      background: "#1a202e",
      searchBackground: "#f5f5f50a",
     
      // icon: "#7381a4",
      icon: "#ccd5f7",
    },
    drawer: {
      main: {
        icon: "",
        text: "",
        selectedIcon: "#5c77ff",
        selectedText: "#fff",
        selectedBackground: "#1890ff",
        background: "#141924",
      },
      side: {
        headIcon: "",
        headText: "aliceblue",
        headBackground: "#171d29",
        selectedHeadIcon: "#",
        selectedHeadText: "#1890ff",
        menuText: "#a1a2b6",
        selectedMenuText: "#fff",
        selectedMenuBackground: "#2d3148",
        background: "#1a202e",
      },
    },
    typography:{
      main: '#ccd5f7'
    },
    primary: {
      main: "#1890ff",
      light: "#a8b3bd",
      dark: "#014e95",
    },
    grey: {
      50: "#363b47",
      100: "#363b4729",
      150: "#555a661f",
      200: "#a4afca29",
      1000: "#363b47",
    },
  },
  typography: {
    htmlFontSize: 10
  }
});

export default theme;
