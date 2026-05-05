import { Sequelize } from "sequelize";
import { db_mutu } from "../config/database.js";
import Tr_pbumku_laporan_file from "./tr_pbumku_laporan_file.js";

const { DataTypes } = Sequelize;

const Tr_pbumku_laporan_header = db_mutu.define(
  "tb_pbumku_laporan_header",
  {
    idlaphdr: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idoss: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idpryk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idchecklist: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idspt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nib: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    status_lap: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_pbumku_laporan_header',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idlaphdr" },
      ]
    },
  ]
});

Tr_pbumku_laporan_header.belongsTo(Tr_pbumku_laporan_file, {
  foreignKey: 'idlaphdr',
  targetKey: 'idlaphdr'
});

export default Tr_pbumku_laporan_header;
