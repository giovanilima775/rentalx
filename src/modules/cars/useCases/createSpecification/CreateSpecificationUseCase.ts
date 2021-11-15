import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';
import { Specification } from '../../entities/Specification';

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationUseCase {

    constructor(private specificationsRepository: ISpecificationsRepository) {

    }
    execute({name, description}: IRequest): void {

        this.specificationsRepository.create({ name, description });
    }


}

export { CreateSpecificationUseCase };
