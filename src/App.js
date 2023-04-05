import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import AddEdit from "./components/pages/AddEdit";
import Edit from "./components/pages/Edit";
import Home from "./components/pages/Home";
import Navbar from "./components/ui/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/edit/:postId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
