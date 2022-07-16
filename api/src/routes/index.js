const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Raza, Temperamento } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  let miData = [];

  try {
    const response = await axios.get(
      // `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      `https://api.thedogapi.com/v1/breeds`
    );
    response.data.map((e) => {
      miData.push({
        id: e.id,
        nombre: e.name,
        temperamento: e.temperament,
        peso: e.weight.metric,
        altura: e.height.metric,
        imagen: e.image.url,
      });
    });
  } catch (error) {
    res.send(error);
  }

  req.query.name &&
    (miData = miData.filter((e) => e.nombre.includes(req.query.name)));

  res.json(miData);
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  let miData = [];

  try {
    const response = await axios.get(
      // `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      `https://api.thedogapi.com/v1/breeds`
    );
    response.data.map((e) => {
      miData.push({
        id: e.id,
        nombre: e.name,
        temperamento: e.temperament,
        peso: e.weight.metric,
        altura: e.height.metric,
        imagen: e.image.url,
      });
    });
  } catch (error) {
    res.send(error);
  }
  res.json(miData.find((e) => e.id === Number(id)));
});

router.post("/dogs", async (req, res) => {
  const { nombre, altura, peso, duracion } = req.body;
  console.log(req.body);
  if (!nombre || !altura || !peso)
    return res.status(404).send("Falta ingresar datos obligatorios");
  try {
    const nuevaRaza = await Raza.create({
      nombre,
      altura,
      peso,
      duracion,
    });
    res.status(201).json(nuevaRaza);
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos");
  }
});

router.get("/temperaments", (req, res) => {

// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

  res.send("Hola parceros");
});

module.exports = router;
