import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';


let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    });
    it("should not be able to add a new specification to a nonexistent car", async () => {


        expect(async () => {
            const car_id = "123";
            const specification_id = ["51442"];
            await createCarSpecificationUseCase.execute({car_id, specification_id});
        }).rejects.toBeInstanceOf(AppError);
    })
    it("should be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const car_id = car.id;
        const specification_id = ["51442"];
        await createCarSpecificationUseCase.execute({car_id, specification_id});
    })
})
