import { getRepository, Repository } from "typeorm";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id}: ICreateCarDTO): Promise<Car> {

        const car = this.repository.create({name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id});

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({ license_plate });
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("c")
            .where("c.available = :available", { available: true });

        if(name) {
            carsQuery.andWhere("c.name = :name", { name });
        }
        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        return await carsQuery.getMany();
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id);
    }


}

export { CarsRepository };