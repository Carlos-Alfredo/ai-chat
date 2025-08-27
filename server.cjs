// server.cjs
const express = require("express");
const sirv = require("sirv");

const app = express();
const dist = "dist";

// serve os arquivos gerados pelo "vite build"
app.use(sirv(dist, { single: true, dev: false }));

const port = process.env.PORT || 8080;
// 🔴 garanta bind em 0.0.0.0
app.listen(port, "0.0.0.0", () => {
  console.log("[server] listening on", port);
});
