import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/CreateCar/CreateCarUseCase';
import { AppError } from '@shared/errors/AppError';


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });

        expect(car).toHaveProperty("id");
    })

    it("should not be able to create a new car with exists license plate", async () => {

        expect(async () =>{
            await createCarUseCase.execute({
                name: "Name Car",
                description: "Description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"
            });

            await createCarUseCase.execute({
                name: "Name Car 2",
                description: "Description 2",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category 2"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });

        expect(car.available).toBe(true);
    })
})
