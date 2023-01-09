const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const multer = require("multer");
const path = require("path");
const cors = require('cors')

dotenv.config();
app.use(cors())
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(`mongodb+srv://admin:admin@pls-dp-04.srrnaky.mongodb.net/blog`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
