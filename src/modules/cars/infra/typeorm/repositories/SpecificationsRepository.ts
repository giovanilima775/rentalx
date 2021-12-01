import { getRepository, Repository } from "typeorm";
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository : Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        return await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specifications = await this.repository.findOne({ name });
        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findByIds(ids);
    }
}

export { SpecificationsRepository };
