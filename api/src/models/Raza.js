const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "raza",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   set(value) {
      //     this.setDataValue(value + "p");
      //   },
      // },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue("altura") + " cm";
        },
      },
      peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue("peso") + " kg";
        },
      },
      duracion: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("duracion") + " años";
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
