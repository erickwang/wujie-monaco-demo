const map = {
  "//localhost:9001/": "//localhost:3000/",
  "//localhost:9002/": "//localhost:9002/",
  "//localhost:19003/": "//localhost:19003/"
};

export default function hostMap(host) {
  return map[host];
}
