import { Sequelize } from "sequelize";
import { db_mutu } from "../config/database.js";

const { DataTypes } = Sequelize;

const Tr_pbumku_laporan_file = db_mutu.define(
  "tb_pbumku_laporan_file",
  {
    idlapfile: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idlaphdr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kbli: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    file_nama: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_content_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status_file: {
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
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_sesuai: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_minor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_mayor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_kritis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_hasil: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    keterangan: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_pbumku_laporan_file',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idlapfile" },
      ]
    },
  ]
});

export default Tr_pbumku_laporan_file