import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from '../createSpecification/CreateSpecificationUseCase';

class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}
    handle(request: Request, response: Response) : Response {
        try{
            const { name, description } = request.body;

            this.createSpecificationUseCase.execute({ name, description });

            return response.status(201).json();
        }  catch (err) {
            return response.status(400).json({ error: err.message });
        }

    }

}

export { CreateSpecificationController };