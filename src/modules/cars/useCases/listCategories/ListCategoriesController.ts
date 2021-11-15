import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
    handle(request: Request, response: Response): Response {

        try{
            const categories = this.listCategoriesUseCase.execute();

            return response.status(200).json(categories);

        }  catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }

}

export { ListCategoriesController };