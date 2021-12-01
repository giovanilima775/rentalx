import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity("car_image")
class CarImage {

    @PrimaryColumn()
    id?: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { CarImage };