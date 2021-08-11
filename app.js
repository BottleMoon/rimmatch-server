const express = require("express");
const app = express();
const match = require("./routes/match");
const index = require("./routes/index");
const user = require("./routes/user");
const club = require("./routes/club");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", index);
app.use("/match/", match);
app.use("/user/", user);
app.use("/club/", club);
app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
