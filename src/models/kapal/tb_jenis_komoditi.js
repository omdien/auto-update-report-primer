import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_jenis_komoditi = db_kapal.define(
  "tb_jenis_komoditi",
  {
    id_jenis_komoditi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ur_jenis_komoditi: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ur_jenis_komoditi_en: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tb_jenis_komoditi',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_jenis_komoditi" },
      ]
    },
    {
      name: "ur_jenis_komoditi",
      using: "BTREE",
      fields: [
        { name: "ur_jenis_komoditi" },
      ]
    },
    {
      name: "ur_jenis_komoditi_en",
      using: "BTREE",
      fields: [
        { name: "ur_jenis_komoditi_en" },
      ]
    },
  ]
});

export default Tb_jenis_komoditi;
