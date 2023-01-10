import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4500",
    },
    secondary: {
      main: "#448aff",
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
}

export default App;
