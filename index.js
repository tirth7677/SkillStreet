const express = require("express");
const mongoose = require("mongoose");
// to make sure our mongodb and secretkey which is use in jwt is not expose
const dotenv = require("dotenv");
// routers
const noteRouter = require("./routes/note.route");
const authRouter = require("./routes/auth.route");

// .config() so we can use the functions
dotenv.config();
const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("successfully connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
// diffrent routes
app.use("/v1/api/note", noteRouter);
app.use("/v1/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});