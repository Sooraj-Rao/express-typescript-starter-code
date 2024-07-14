import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./src/utils/db/db.connect";
import { authRouter } from "./src/routers/auth.route";
import { errorMiddleware } from "./src/middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// DB conn.
(async () => {
  try {
    await connectDb();
  } catch (error) {
    process.exit(1);
  }
})();

app.use("/api/auth", authRouter);

// err middleware.
app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    error: true,
    message: "Resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
