import { injectable, inject } from "tsyringe"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {

    constructor(@inject("CarRepository") private carRepository: ICarsRepository) { }

    async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id}): Promise<Car> {
        const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);

        if (carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        return await this.carRepository.create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id });

    }
}

export { CreateCarUseCase }