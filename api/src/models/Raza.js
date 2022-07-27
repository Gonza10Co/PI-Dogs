const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "raza",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      duracion: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("duracion") + " years";
        },
      },
      alturaMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alturaMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pesoMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pesoMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
