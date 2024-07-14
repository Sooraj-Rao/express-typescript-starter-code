import { NextFunction, Request, Response, Router } from "express";

export const router = Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const error = new Error(
        "Validation error: Username and password are required"
      );
      error.name = "ValidationError";
      return next(error);
    }
    res.send({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;
      // simply testing..
      const userExists = true;
      if (userExists) {
        const error = new Error("Database error: Username already exists");
        error.name = "DatabaseError";
        return next(error);
      }
      res.send({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }
);

export { router as authRouter };
