import "./App.css";
import React from "react";
import { HydraAdmin } from "@api-platform/admin";

function App() {
  return (
    <div className="App">
      <HydraAdmin entrypoint="http://localhost:8000/api" />
    </div>
  );
}

export default App;
