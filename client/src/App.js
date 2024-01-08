import './App.css';
import React from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
      <div className="App">
        <Home/>
      </div>
  );
}

export default App;
