import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;