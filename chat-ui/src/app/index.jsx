import React from "react";
import ContainerApp from "../app/ui/container";
import { AppProvider } from "./context"
import './global.css';

function App() {
  return (
    <AppProvider>
      <ContainerApp />
    </AppProvider>
  );
}

export default App;
