const axios = require("axios");
require("dotenv").config();
// const { API_KEY } = process.env;
const { Raza, Temperamento } = require("../db");

module.exports = {
  getApi: async function () {
    let miBD = await Raza.findAll({
      include: [
        {
          model: Temperamento,
          attributes: ["temperamento"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    let miApi = [];
    try {
      const response = await axios.get(
        // `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
        `https://api.thedogapi.com/v1/breeds`
      );
      response.data.map((e) => {
        miApi.push({
          id: `api_${e.id}`,
          nombre: e.name,
          duracion: e.life_span,
          alturaMin: e.height.metric.split(" - ")[0],
          alturaMax: e.height.metric.split(" - ")[1],
          pesoMin:
          e.weight.metric.split(" - ")[0] || e.weight.metric.split(" - ")[1],
          pesoMax:
          e.weight.metric.split(" - ")[1] || e.weight.metric.split(" - ")[0],
          temperamentos: e.temperament?.split(", "),
          imagen: e.image.url,
        });
        //Cuando viene NaN me daña el ordenamiento por peso.
        if (isNaN(miApi[miApi.length - 1].pesoMin)) miApi[miApi.length - 1].pesoMin = 0;
        if (isNaN(miApi[miApi.length - 1].pesoMax)) miApi[miApi.length - 1].pesoMax = 0;
      });
      return miBD.concat(miApi);
    } catch (error) {
      throw error;
    }
  },
};
