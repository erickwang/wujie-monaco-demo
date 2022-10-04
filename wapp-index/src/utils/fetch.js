// 携带登录态credentials必须为include
export default function fetch(url, options) {
  console.log('url >>> ', url);
  return window.fetch(url, { ...options, credentials: "omit" });
}
