import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { Suspense, createContext, useMemo, useState } from "react";
import { CircularProgress, PaletteMode } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const storedTheme = localStorage.getItem("theme") as PaletteMode;
  const [mode, setMode] = useState<PaletteMode>(storedTheme || 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
