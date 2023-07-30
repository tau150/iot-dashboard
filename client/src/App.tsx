import { ThemeProvider } from "styled-components";

import { Dashboard } from "./views/Dashboard";
import { theme } from "./theme";
import { SocketContextProvider } from "./contexts/SocketContext";

function App() {
  return (
    <SocketContextProvider>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </SocketContextProvider>
  );
}

export default App;
