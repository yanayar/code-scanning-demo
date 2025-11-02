const express = require("express");
const app = express();

const site = await Bun.file("./index.html").text();

function escapeHtml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.get("/", async (req, res) => {
  const safeName = escapeHtml(req.query.name);
  let greet = site.replace("%%_USER_NAME%%", safeName);
  res.send(greet);
});

app.listen(8080, () => {
  console.log("The webpage is live on http://localhost:8080 :)");
});
