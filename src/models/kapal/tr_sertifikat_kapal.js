import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tr_sertifikat_kapal = db_kapal.define(
  "tr_sertifikat_kapal",
  {
    id_sert: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomor_aju_kapal: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nomor_sertifikat: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nama_kapal: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    alamat_pemilik: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ukuran_kapal: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    jenis_kapal: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "1. Penangkapan; 2. Pengangkut; 3. Pembeku"
    },
    tanggal_inspeksi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    id_jenis_komoditi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kota_terbit: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tanggal_terbit: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    berlaku_sampai: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nip_ttd: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    nama_ttd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jabatan_ttd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sts_tte: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_sertifikat_kapal',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_sert" },
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
      name: "nomor_sertifikat",
      using: "BTREE",
      fields: [
        { name: "nomor_sertifikat" },
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
      name: "nama_kapal",
      using: "BTREE",
      fields: [
        { name: "nama_kapal" },
      ]
    },
  ]
});

export default Tr_sertifikat_kapal;
