import { Sequelize } from "sequelize";
import { db_mutu } from "../config/database.js";

const { DataTypes } = Sequelize;

const Tb_skala_usaha_skp = db_mutu.define(
  "tb_skala_usaha_skp",
  {
    id_skala: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kode_skala: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    uraian_skala: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    modal_upi: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tb_skala_usaha_skp',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_skala" },
      ]
    },
  ]
});

export default Tb_skala_usaha_skp;
