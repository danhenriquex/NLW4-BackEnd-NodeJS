import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  // https://ethereal.email/1?u=1f0cf376-ff3a-4483-9fc4-f38e3c477c8e
  /**
   * Route Params => Paramêtros que compõe a rota
   * routes.get('/answers/:value)
   *
   * Query Params => Busca, Paginação, não obrigatórios
   * ?
   * chave=valor
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey user does not exist");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
