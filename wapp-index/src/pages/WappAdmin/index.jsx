import React from "react";
import hostMap from "../../utils/hostMap";
import WujieReact from "wujie-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WappHome() {
  const location = useLocation();
  const navigation = useNavigate();
  const wappHomeUrl = hostMap("//localhost:19003/");
  const path = location.pathname.replace("/wapp-admin-sub", "").replace("/wapp-admin", "");////
  // 告诉子应用要跳转哪个路由
  path && WujieReact.bus.$emit("wapp-admin-router-change", path);
  const props = {
    jump: (name) => {
      navigation(`/${name}`);
    },
  };
  return (
    // 保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化
    <WujieReact
      width="100%"
      height="100%"
      name="wapp-admin"
      url={wappHomeUrl}
      sync={!path}
      props={props}
    ></WujieReact>
  );
}
