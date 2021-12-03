import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesUseCase } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesUseCase';


interface IFIles {
    filename: string;
}
class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFIles[];

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map(file => file.filename);

        uploadCarImagesUseCase.execute({ car_id: id, images_name });

        return response.status(201).send();
    }
}

export { UploadCarImagesController };