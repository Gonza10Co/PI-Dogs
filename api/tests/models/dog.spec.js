const { Raza, conn } = require("../../src/db.js");

describe("Ability Model", () => {
  beforeAll(async () => {
    await Raza.sync({ force: true });
  });

  describe("Validation", () => {
    it("should not create the Breed if nombre is not send", async () => {
      expect.assertions(1);
      try {
        const newBreed = {
          duracion: 20,
          alturaMin: 5,
          alturaMax: 10,
          pesoMin: 6,
          pesoMax: 12,
        };
        await Raza.create(newBreed);
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
    it("should not create the Breed if altura is not send", async () => {
      expect.assertions(1);
      try {
        const newBreed = {
          nombre: "English Bulldog",
          alturaMax: 10,
          pesoMin: 6,
          pesoMax: 12,
        };
        await Raza.create(newBreed);
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
    it("should not create the Breed if peso is not send", async () => {
      expect.assertions(1);
      try {
        const newBreed = {
          nombre: "English Bulldog",
          alturaMin: 5,
          alturaMax: 10,
          pesoMax: 12,
        };
        await Raza.create(newBreed);
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
    it("should create the Breed if all required properties are ok", async () => {
      const newBreed = {
        nombre: "English Bulldog",
        alturaMin: 5,
        alturaMax: 10,
        pesoMin: 6,
        pesoMax: 12,
      };

      const breed = await Raza.create(newBreed);
      expect(breed.toJSON()).toHaveProperty("nombre", "English Bulldog");
      expect(breed.toJSON()).toHaveProperty("alturaMin", 5);
      expect(breed.toJSON()).toHaveProperty("alturaMax", 10);
      expect(breed.toJSON()).toHaveProperty("pesoMin", 6);
      expect(breed.toJSON()).toHaveProperty("pesoMax", 12);
    });
    it("should not create two breeds with the same name", async () => {
      const newBreed1 = {
        nombre: "English Bulldog",
        alturaMin: 5,
        alturaMax: 10,
        pesoMin: 6,
        pesoMax: 12,
      };
      const newBreed2 = {
        nombre: "English Bulldog",
        alturaMin: 5,
        alturaMax: 10,
        pesoMin: 6,
        pesoMax: 12,
      };
      try {
        const breed1 = await Raza.create(newBreed1);
        expect(breed1.toJSON()).toHaveProperty("nombre", "English Bulldog");
        expect(breed1.toJSON()).toHaveProperty("alturaMin", 5);
        expect(breed1.toJSON()).toHaveProperty("alturaMax", 10);
        expect(breed1.toJSON()).toHaveProperty("pesoMin", 6);
        expect(breed1.toJSON()).toHaveProperty("pesoMax", 12);
        const breed2 = await Raza.create(newBreed2);
        expect(breed2.toJSON()).toHaveProperty("nombre", "English Bulldog");
        expect(breed2.toJSON()).toHaveProperty("alturaMin", 5);
        expect(breed2.toJSON()).toHaveProperty("alturaMax", 10);
        expect(breed2.toJSON()).toHaveProperty("pesoMin", 6);
        expect(breed2.toJSON()).toHaveProperty("pesoMax", 12);
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
});
