import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
// import { Car}

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError('Car not found');
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);

        console.log(carExists);
    }
}

export { CreateCarSpecificationUseCase };
