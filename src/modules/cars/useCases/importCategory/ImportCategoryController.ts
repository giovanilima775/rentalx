import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUsCase: ImportCategoryUseCase) {}
    handle(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoryUsCase.execute(file);

        return response.send();
    }
}

export { ImportCategoryController };