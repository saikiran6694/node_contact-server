import express from "express";
import * as dotenv from "dotenv";
import contactRoute from "./routes/contactRoutes.js";
import userRoute from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 9002;

app.use(express.json());
app.use("/api/contact", contactRoute);
app.use("/api/users", userRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Getting Started" });
});

app.listen(port, () => console.log(`Server running on ${port}`));
