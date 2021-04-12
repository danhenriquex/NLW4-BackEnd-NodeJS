import express, {
  request,
  NextFunction,
  Response,
  Request,
  Router,
} from "express";
import "express-async-errors";
import "reflect-metadata";
import createConnection from "./database";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();
const app = express();

/*
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

// http://localhost:3333/users

// Minuto 45:51

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
