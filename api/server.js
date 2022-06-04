const express = require('express');
const dotenv = require('dotenv');
const app = express();
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/Post");
const userRoute = require("./routes/User");
const CategoryRoute = require("./routes/Category");
const mongoose = require('mongoose')
const multer = require("multer");
const path = require("path");

dotenv.config();



mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Database!")
}).catch(err => console.log(err))

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/categories", CategoryRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err);

    }
});

//app.use("/api/auth", userRoute);
app.listen(3004, ()=>{
    console.log("Sever running on port 3004")
})