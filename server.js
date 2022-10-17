require("dotenv").config();

const express = require("express");
const app = express();

require("express-async-errors");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const authRouter = require("./routers/authRouters");
const jobsRouter = require("./routers/jobRouters");
//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

// app.get('/api/v1/auth/log', (req, res) => {
//     res.send("welcome ..")
// })

app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`server running on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
