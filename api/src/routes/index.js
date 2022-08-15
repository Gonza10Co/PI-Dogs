const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const { getApi } = require("../middlewares");
const router = Router();

//Endpoint q une bd con api y devuelve json
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let miData = await getApi();
  // miData.forEach((e) => {//por si exigen solamente lo de la ruta principal
  //   delete e.alturaMax;
  //   delete e.alturaMin;
  //   delete e.duracion;
  // });
  if (name) {
    const nameArray = name.split(" ");
    const newName = [];
    for (const palabra of nameArray) {
      newName.push(
        palabra[0].toUpperCase() + palabra.substring(1).toLowerCase()
      );
    }
    const raza = newName.join(" ");
    const perro = miData.filter((e) => e.nombre.includes(raza));

    perro.length
      ? res.json(perro)
      : res.status(404).send(`La raza ${raza} no existe en nuestros registros`);
  } else {
    res.json(miData);
  }
});

//Endpoint q devuelve la raza con el id buscado
router.get("/dogs/:id", async (req, res) => {
  let miData = await getApi();
  const miDog = miData.find(
    (e) =>
      Number(req.params.id)
        ? e.id === Number(req.params.id) //From BD
        : e.id === req.params.id //From API
  );
  if (miDog) {
    res.status(200).json(miDog);
  } else {
    res.status(404).send("Dog not found");
  }
});

//Endpoint q crea nueva raza y enlaza con temperamento
router.post("/dogs", async (req, res) => {
  const {
    nombre,
    duracion,
    alturaMin,
    alturaMax,
    pesoMin,
    pesoMax,
    temperamentos,
    imagen,
  } = req.body;
  if (!nombre || !alturaMin || !alturaMax || !pesoMin || !pesoMax)
    return res.status(404).send("Falta ingresar datos obligatorios");
  try {
    const nuevaRaza = await Raza.create({
      nombre,
      duracion,
      alturaMin,
      alturaMax,
      pesoMin,
      pesoMax,
      imagen,
    });
    if (temperamentos) {
      let tempId = []; //Hago el link temp-razas
      for (let i = 0; i < temperamentos.length; i++) {
        const [att, created] = await Temperamento.findOrCreate({
          where: { temperamento: temperamentos[i] },
          defaults: { temperamento: temperamentos[i] },
        });
        tempId.push(att.id); //creo el array de ids de temp
      }
      await nuevaRaza.addTemperamentos(tempId);
    }
    res.status(201).json(nuevaRaza);
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos");
  }
});

//Endpoint que crea todos los temperamentos
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
    raza.temperamentos?.forEach((e) => {
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

//Endpoint que filtra los perros por temperamento
router.post("/temperament/dogs", async (req, res) => {
  const { temp } = req.body;
  let miData = await getApi();
  if (temp.length) {
    const perros = [];
    miData.forEach((e) => {
      //Si es de bd temperamentos es array de objetos
      if (e.temperamentos && typeof e.temperamentos[0] === "object") {
        let arrayTemp = [];
        e.temperamentos.forEach((element) => {
          arrayTemp.push(element.temperamento);
        });
        temp.every((v) => arrayTemp.includes(v)) && perros.push(e);
      }
      //si es de api temperamentos es array de strings
      if (e.temperamentos && typeof e.temperamentos[0] === "string")
        temp.every((v) => e.temperamentos.includes(v)) && perros.push(e);
    });
    perros.length
      ? res.json(perros)
      : res
          .status(404)
          .send(`El temperamento ${temp} no existe en nuestros registros`);
  } else {
    res.json(miData);
  }
});

router.delete("/dogs/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(
      Raza.destroy({
        where: { id },
      })
    );
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

