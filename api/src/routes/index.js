const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const { getApi } = require("../middlewares");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  let miData = await getApi();
  if (req.query.name) {
    const raza =
      req.query.name[0].toUpperCase() +
      req.query.name.substring(1).toLowerCase();
    const perro = miData.filter((e) => e.nombre.includes(raza));
    perro.length
      ? res.json(perro)
      : res.status(404).send(`La raza ${raza} no existe en nuestros registros`);
  } else {
    res.json(miData);
  }
});

router.get("/dogs/:id", async (req, res) => {
  let miData = await getApi();
  res.json(
    miData.find(
      (e) =>
        Number(req.params.id)
          ? e.id === Number(req.params.id) //From BD
          : e.id === req.params.id //From API
    )
  );
});

router.post("/dogs", async (req, res) => {
  const { nombre, altura, peso, duracion } = req.body;
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

router.get("/temperaments", async (req, res) => {
  const myTemps = await Temperamento.findAll();
  if (myTemps.length) return res.json(myTemps);
  console.log("Cargando datos de API...");
  let strTemp = []; //Array de strings
  const objTemp = []; //Array de objs
  let miData = await getApi();
  //Dentro de cada raza...
  miData.map((raza) => {
    //Reviso el array de temperamento...
    raza.temperamento?.forEach((e) => {
      //Si el temperamento no esta en mi array strTemp...
      if (!strTemp.includes(e)) {
        //lo incluyo en strTemp, y...
        strTemp.push(e);
        //creo el obj para enviar a bd
        objTemp.push({ temperamento: e });
      }
    });
  });

  res.json(await Temperamento.bulkCreate(objTemp));
});

module.exports = router;
