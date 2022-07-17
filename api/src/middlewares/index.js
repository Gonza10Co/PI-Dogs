const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Raza } = require("../db");

module.exports = {
  getApi: async function () {
    let miBD = await Raza.findAll();
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
          temperamento: e.temperament?.split(", "),
          peso: e.weight.metric,
          altura: e.height.metric,
          imagen: e.image.url,
        });
      });
      return miBD.concat(miApi);
    } catch (error) {
      throw error;
    }
  },
};
