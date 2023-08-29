import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#9f111b",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontSize: "2rem", // Tamaño de fuente para h1
      fontWeight: 600, // Peso de fuente (600 es negrita)
      marginBottom: "1rem", // Margen inferior
      color: "red",
    },
    h2: {
      fontSize: "1.5rem", // Tamaño de fuente para h2
      fontWeight: 500, // Peso de fuente (500 es seminegrita)
      marginBottom: "0.75rem", // Margen inferior
    },
  },
});

export default theme;
