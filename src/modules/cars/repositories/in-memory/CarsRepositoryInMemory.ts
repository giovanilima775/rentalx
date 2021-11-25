import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name, description, daily_rate, license_plate, fine_amount, brand, category_id
        });

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory };