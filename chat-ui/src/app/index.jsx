import React from "react";
import ContainerApp from "../app/ui/container";
import { AppProvider } from "./context"
import './global.css';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <ContainerApp />
      </AppProvider>
    </div>
  );
}

export default App;
