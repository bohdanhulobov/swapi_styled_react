import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Planets from "./pages/Planets";
import Transport from "./pages/Transport";

import "./App.css";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      secondary: {
        main: mode === "light" ? "#f50057" : "#f73378",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "background.default",
                },
              }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/planets" element={<Planets />} />
              <Route path="/transport" element={<Transport />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
