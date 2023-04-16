const express = require("express");
const multer = require("multer");
const cors = require("cors");
const util = require("util");
const fs = require("fs");
const path = require("path");
const unlinkFile = util.promisify(fs.unlink);

const app = express();

/* var corOptions = {
  origin: "https://localhost:8081",
};
 */
///Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assests/img/games");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var nameFile = file.originalname;
    cb(null, nameFile);
  },
});
const upload = multer({ storage: storage });
///FileUpload / InsertGame

app.get("/upload", (req, res) => {
  res.render("upload");
});
////////////UPLOAD POST
app.post("/upload", upload.single("image"), (req, res) => {
  // Use the multer objec
  res.send("Image uploaded");
});
//Router

const router = require("./routes/index.js");
app.use("/api/games", router.games);
app.use("/api/users", router.users);
app.use("/api/media", router.media);
app.use("/api/contribucion", router.contribucion);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
