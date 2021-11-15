import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository,
    ) {}

    execute({ name, description }: IRequest): void {
        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
