import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUsCase: ImportCategoryUseCase) {}
    handle(request: Request, response: Response): Response {
        try{
            const { file } = request;
            this.importCategoryUsCase.execute(file);

            return response.send();

        }  catch (err) {
            return response.status(400).json({ error: err.message });
        }

    }
}

export { ImportCategoryController };