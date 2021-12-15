import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository{
    private respository: Repository<Rental>;
    constructor() {
        this.respository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.respository.findOne({ car_id });
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.respository.findOne({ user_id });
    }
    async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<any> {
        const rental = this.respository.create({
            car_id,
            user_id,
            expected_return_date
        });

        return await this.respository.save(rental);
    }
    async findById(id: string): Promise<Rental> {
        return await this.respository.findOne(id);
    }

}

export { RentalsRepository };