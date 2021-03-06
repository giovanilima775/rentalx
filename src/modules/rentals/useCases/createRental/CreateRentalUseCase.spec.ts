import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    })
    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123456",
            car_id: "122121",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })

    it("should not be able to create a new rental if there is another open to the same car", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "132",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "122121",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "122121111",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create a new rental with invalid return time", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "122121",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    })
});