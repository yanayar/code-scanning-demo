const express = require("express");
const escapeHtml = require("escape-html");
const app = express();

const site = await Bun.file("./index.html").text();

app.get("/", async (req, res) => {
  const userName = req.query.name || "Guest";
  const sanitizedUserName = escapeHtml(userName);
  let greet = site.replace("%%_USER_NAME%%", sanitizedUserName);
  res.send(greet);
});

app.listen(8080, () => {
  console.log("The webpage is live on http://localhost:8080 :)");
});
