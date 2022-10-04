import React from 'react'
import ReactDOM from 'react-dom'
import WujieReact from "wujie-react"
import App from './App'
import hostMap from "./utils/hostMap";
import credentialsFetch from "./utils/fetch";
import lifecycles from "./utils/lifecycle";
import plugins from "./utils/plugin";

import './index.less'

const { setupApp, preloadApp, bus } = WujieReact;
const isProduction = process.env.NODE_ENV === "production";
bus.$on("click", (msg) => window.alert(msg));

const degrade = window.localStorage.getItem("degrade") === "true" || !window.Proxy || !window.CustomElementRegistry;

/**
 * 大部分业务无需设置 attrs
 * 此处修正 iframe 的 src，是防止github pages csp报错
 * 因为默认是只有 host+port，没有携带路径
 */
const attrs = {};

/**
 * 配置应用，主要是设置默认配置
 * preloadApp、startApp的配置会基于这个配置做覆盖
 */
setupApp({
  name: "wapp-admin",
  url: hostMap("//localhost:19003/"),
  attrs,
  exec: true,
  alive: false,
  fetch: credentialsFetch,
  plugins,
  // prefix: { "prefix-dialog": "/dialog", "prefix-location": "/location" },
  degrade,
  ...lifecycles,
});


if (window.localStorage.getItem("preload") !== "false") {
  preloadApp({ name: "wapp-admin" });
}

ReactDOM.render(<App />, document.getElementById("root"));
