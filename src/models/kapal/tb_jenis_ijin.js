import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_jenis_ijin = db_kapal.define(
  "tb_jenis_ijin",
  {
    id_jenis_ijin: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uraian_ijin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    jenis_ijin: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tb_jenis_ijin',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_jenis_ijin" },
      ]
    },
    {
      name: "uraian_ijin",
      using: "BTREE",
      fields: [
        { name: "uraian_ijin" },
      ]
    },
  ]
});

export default Tb_jenis_ijin;