import "./App.css";
import React from "react";
import { HydraAdmin } from "@api-platform/admin";

function App() {
  return (
    <div className="App">
      <HydraAdmin entrypoint="https://localhost:8000/api" />
    </div>
  );
}

export default App;
