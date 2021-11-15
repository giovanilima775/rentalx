import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable} from 'tsyringe';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ){}

    async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void>{
        await this.usersRepository.create({
            name, password, email, driver_license
        });
    }

}

export { CreateUserUseCase };