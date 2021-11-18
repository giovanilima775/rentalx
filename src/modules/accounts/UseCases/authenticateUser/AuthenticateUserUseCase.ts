import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatche = await compare(password, user.password);

        if (!passwordMatche) {
            throw new AppError('Email or password incorrect!');
        }

        const token = sign({}, '3e7d6de10d442b2d57ca21e508819a4f', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
