import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '@shared/infra/http/app';

import createConnection from "@shared/infra/typeorm";
import { v4 as uuidV4 } from 'uuid';


let connection: Connection;
describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `,
        );
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            name: "Category Test",
            description: "Category SuperTest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    })

    it("should not be able to create a new category with a name that exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories")
        .send({
            name: "Category Test2",
            description: "Category SuperTest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).post("/categories")
        .send({
            name: "Category Test2",
            description: "Category SuperTest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(400);
    })
})