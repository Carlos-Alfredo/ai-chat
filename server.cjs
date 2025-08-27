// server.cjs
const express = require("express");
const sirv = require("sirv");

const app = express();
const dist = "dist";

// Healthcheck opcional (útil pra logs)
app.get("/_ah/health", (_req, res) => res.status(200).send("ok"));

// Serve o build do Vite e faz fallback SPA
app.use(sirv(dist, { single: true, dev: false }));

const port = process.env.PORT || 8080;
// ⚠️ Importante: bind em 0.0.0.0, não "localhost"
app.listen(port, "0.0.0.0", () => {
  console.log(`[server] listening on ${port}`);
});
