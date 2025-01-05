import express from "express";
const app = express();
import userRouter from "./router/user-router.js";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
