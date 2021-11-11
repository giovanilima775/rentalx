import fs from 'fs';

class ImportCategoryUseCase{

    execute(file: Express.Multer.File): void{
        const stream = fs.createReadStream(file.path);
        // stream.pipe();
    }
}

export { ImportCategoryUseCase };