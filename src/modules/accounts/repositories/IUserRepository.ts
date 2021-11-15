import { User } from '../entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';



interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUserRepository };