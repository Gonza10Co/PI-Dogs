/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require("chai");
const request = require("supertest");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Raza, conn } = require("../../src/db.js");

// const agent = session(app);
// const dog = {
//   nombre: "Pug",
//   alturaMin: 12,
//   alturaMax: 30,
//   pesoMin: 15,
//   pesoMax: 32,
// };

// describe("Dogs routes", () => {
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   beforeEach(() => Raza.sync({ force: true }).then(() => Raza.create(dog)));
//   xdescribe("GET /dogs", () => {
//     it("should get 200", () => agent.get("/dogs").expect(200));
//   });
// });

describe("Dogs Routes", () => {
  beforeAll(async () => {
    await Raza.sync({ force: true });
  });

  describe("POST /dogs", () => {
    it("should return status 404 and corresponding text if any of the mandatory parameters is not send", async () => {
      const res = await request(app).post("/dogs");
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Falta ingresar datos obligatorios");
    });

    it("should return status 201 and breed object if the breed was succesfully created", async () => {
      const newBreed = {
        nombre: "English Bulldog",
        alturaMin: 5,
        alturaMax: 10,
        pesoMin: 6,
        pesoMax: 12,
      };
      const res = await request(app).post("/dogs").send(newBreed);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          nombre: "English Bulldog",
          alturaMin: 5,
          alturaMax: 10,
          pesoMin: 6,
          pesoMax: 12,
        })
      );
    });
  });
});
