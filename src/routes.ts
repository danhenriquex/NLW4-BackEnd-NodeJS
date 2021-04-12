import express, { NextFunction, Response, Request, Router } from "express";
import "express-async-errors";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";
import { SendEmailController } from "./controllers/SendEmailController";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { app } from "./app";
import { AppError } from "./errors/AppError";

const router = Router();
// const app = express();

const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendEmailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };
