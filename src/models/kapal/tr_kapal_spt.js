import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tr_kapal_spt = db_kapal.define(
  "tr_kapal_spt",
  {
    idspt: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomor_aju_kapal: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nomor_spt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tanggal_spt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    kd_upt: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nama_izin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pejabat_ttd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jabtan_ttd: {
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
    },
    sts_tte: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_kapal_spt',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idspt" },
      ]
    },
    {
      name: "nomor_aju_kapal",
      using: "BTREE",
      fields: [
        { name: "nomor_aju_kapal" },
      ]
    },
    {
      name: "sts_tte",
      using: "BTREE",
      fields: [
        { name: "sts_tte" },
      ]
    },
    {
      name: "nomor_spt",
      using: "BTREE",
      fields: [
        { name: "nomor_spt" },
      ]
    },
  ]
});

export default Tr_kapal_spt;