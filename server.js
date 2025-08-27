// server.js (CommonJS)
const express = require("express");
const sirv = require("sirv");

const app = express();
const dist = "dist";

app.use(sirv(dist, { single: true, dev: false })); // SPA fallback p/ index.html

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("listening on", port));

