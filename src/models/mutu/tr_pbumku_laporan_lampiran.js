import { Sequelize } from "sequelize";
import { db_mutu } from "../../config/database.js";
import e from "express";
// import Tr_pbumku_laporan_file from "./tr_pbumku_laporan_file.js";

const { DataTypes } = Sequelize;

const Tr_pbumku_laporan_lampiran = db_mutu.define(
  "tr_pbumku_laporan_lampiran",
  {
    idlaplampiran: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idlaphdr: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    kbli: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nomor_referensi_teknis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    komoditas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kategori: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jenis_sediaan_obat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    peruntukan_produk: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'tr_pbumku_laporan_lampiran',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idlaplampiran" },
        ]
      },
    ]
  });

  export default Tr_pbumku_laporan_lampiran;
