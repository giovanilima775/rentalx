import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { Request, Response, NextFunction } from 'express';

export async function ensureAdmin(Request: Request, Response: Response, next: NextFunction) {
    const { id } = Request.user;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new Error('User is not admin');
    }

    next();
}