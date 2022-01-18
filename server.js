const path = require("path");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

let app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
   .connect(process.env.mongoURI || db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
   })
   .then(() => console.log("MongoDB Connected..."))
   .catch((err) => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets if where in production
if (process.env.NODE_ENV === "production") {
   //Set static folder
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
