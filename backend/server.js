import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import serviceProviderRouter from "./routes/serviceProviderRoute.js"
import userRouter from "./routes/userRoutes.js";
import fileUpload from "express-fileupload"; // Import express-fileupload


//app config



const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares

app.use(express.json());
app.use(cors());


//api endpoint

app.use("/api/admin", adminRouter);
app.use("/api/professional", serviceProviderRouter);
app.use("/api/user", userRouter);
//localhost:4000/api/admin

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`App is Running on ${port}`);
});
