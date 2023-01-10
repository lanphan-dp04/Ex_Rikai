const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');
const uploadCloud = require("./utils/cloudinary");
const route = require("./routes/index");

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


app.post("/api/upload", uploadCloud.single('file') , (req, res) => {
  return res.status(200).json(req.file.path);
});
route(app)


app.listen("5000", () => {
  console.log("Backend is running.");
});
