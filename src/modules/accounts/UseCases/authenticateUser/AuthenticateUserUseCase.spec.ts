import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import  { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AppError } from "../../../../errors/AppError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });
    it("should be able to authenticate an unser", async () => {
        const user: ICreateUserDTO ={
            name: "John",
            password: "password",
            email: "jhon@email.com",
            driver_license: "00012523654"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");

    })

    it("should not be able to authenticate a nonexistent unser", async () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "nonexistent@nonexistent.com",
                password: "nonexistent",
            });
        }).rejects.toBeInstanceOf(AppError);

    })

    it("should not be able to authenticate with incorrect password", async () => {


        expect(async () => {
            const user: ICreateUserDTO ={
                name: "John",
                password: "password",
                email: "jhon@email.com",
                driver_license: "00012523654"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "nonexistent"
            });

        }).rejects.toBeInstanceOf(AppError);

    })
})