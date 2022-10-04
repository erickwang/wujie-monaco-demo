import { HashRouter as Router, Route, Routes, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import WujieReact from "wujie-react";
import React, { useState } from "react";

import Default from './pages/Default';
import WappAdmin from "./pages/WappAdmin";

import './App.less';


function Nav() {
  const location = useLocation();
  const navigation = useNavigate();


  return (
    <nav>
      <NavLink to="/wapp-default" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        默认页
      </NavLink>
      <NavLink to="/wapp-admin" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        编辑器测试
      </NavLink>
    </nav>
  );
}

class App extends React.PureComponent {

  render() {

    return (
      <div className="app">
          <Router>
            <div className="nav">
              <Nav />
            </div>
            <div className="content">
              <Routes>
                <Route exact path="/default" element={<Default />} />
                <Route exact path="/wapp-admin" element={<WappAdmin />} />
                <Route path="*" element={<Navigate to="/default" replace />} />
              </Routes>
            </div>
          </Router>
        </div>
    );

  }
}

export default App
