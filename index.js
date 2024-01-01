const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const noteRouter = require("./routes/note.route");
const authRouter = require("./routes/auth.route");

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
app.use("/v1/api/note", noteRouter);
app.use("/v1/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
