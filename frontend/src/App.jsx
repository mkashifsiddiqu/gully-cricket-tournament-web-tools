/* eslint-disable no-unused-vars */
// * Imported Libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// * Pages
import Team from "./pages/Team";
import Layout from "./components/layout";
import Player from "./pages/Player";
import Match from "./pages/Match";
import LiveMatchMonitor from "./pages/LiveMatchMonitor";
import NotFound from "./pages/NotFound";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Router>
          {/* Layout contain Header , sideBar */}
          <Routes>
            <Route path="/" element={ <Layout><Home /></Layout>} />
            <Route path="/team" element={<Layout><Team /></Layout>} />
            <Route path="/player" element={<Layout><Player /></Layout>} />
            <Route path="/match" element={<Layout><Match /></Layout>} />
            <Route path="/setting" element={<Layout><Setting /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            {/* no Layout */}
            <Route path="/live-match/:id" element={<LiveMatchMonitor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
       
      </Router>
    </>
  );
}

export default App;
