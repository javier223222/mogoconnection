if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/singUp.Router");
const { connectDB } = require("./config/db.config");
const PORT = process.env.PORT || 5000;
const app = express();
connectDB()
app.use(express.json());
app.use("/signup",router)
app.use("/login",require("./routes/Login.Router"))
app.use("/delete",require("./routes/DeleteUser.Router"))
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
   
}))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




