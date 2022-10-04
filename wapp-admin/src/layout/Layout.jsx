import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import { useHistory, useLocation, withRouter } from 'ice';
import {fixMonacoEditorEnviroment } from '../utils';

fixMonacoEditorEnviroment(); // 解决 worker 跨域问题

const Layout = (props) => {

  const history = useHistory();
  const location = useLocation();
  const pathname = location ? location.pathname : null;

  useEffect(() => {
      if(window.$wujie) {
        fixMonacoEditorEnviroment();
      }
  }, []);

  return <div className="x-layout">
    {props.children}
  </div>;
};

export default Layout;
