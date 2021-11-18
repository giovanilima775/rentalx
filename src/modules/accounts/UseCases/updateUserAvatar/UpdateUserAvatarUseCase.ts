import { inject, injectable } from 'tsyringe';
import {deleteFile} from '@utils/file';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

interface IRequest{
    user_id: string;
    avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){};

    async execute({user_id, avatar}: IRequest): Promise<void>{
        const user =  await this.userRepository.findById(user_id);

        if(user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar;
        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };