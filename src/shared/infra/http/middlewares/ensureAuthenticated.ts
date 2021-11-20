import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, '3e7d6de10d442b2d57ca21e508819a4f') as IPayload;

        const usersRepository = new UserRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found', 401);
        }

        request.user = {
            id: user_id
        };

        next();
    }catch (err) {
        throw new AppError('Invalid JWT token', 401);
    }
}