import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_master_kapal = db_kapal.define(
  "tb_master_kapal",
  {
    id_kapal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_kapal: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ukuran_kapal: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    nib: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    npwp: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    pemilik: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    alamat_pemilik: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telp_pemilik: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email_pemilik: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    penanggung_jawab: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alamat_pj: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telp_pj: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email_pj: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nama_nahkoda: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jumlah_abk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kode_trader: {
      type: DataTypes.INTEGER,
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
  tableName: 'tb_master_kapal',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_kapal" },
      ]
    },
    {
      name: "nama_kapal",
      using: "BTREE",
      fields: [
        { name: "nama_kapal" },
      ]
    },
    {
      name: "kode_trader",
      using: "BTREE",
      fields: [
        { name: "kode_trader" },
      ]
    },
  ]
});

export default Tb_master_kapal;
