import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tr_ppm_kapal = db_kapal.define(
  "tr_ppm_kapal",
  {
    nomor_aju_kapal: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    tanggal_aju_kapal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_kapal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nama_kapal: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ukuran_kapal: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    status_permohonan: {
      type: DataTypes.STRING(1),
      allowNull: false,
      comment: "1.Permohonan Baru\/2.Perpanjangan"
    },
    nama_nahkoda: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jumlah_abk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kd_prop: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    kd_kota: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    kode_upt: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    daerah_tangkap: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "WPP"
    },
    alat_tangkap: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lama_operasi: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    berat_bbm: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    berat_air: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    berat_es: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    jenis_kapal: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "1. Penangkapan; 2. Pengangkut; 3. Pembeku"
    },
    tempat_pendaratan: {
      type: DataTypes.STRING(85),
      allowNull: true
    },
    fasilitas_pembeku: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "1. Dengan alat pembeku (freezer fishing vessel); 2.tanpa alat pembeku (non freezer fishing vessel)"
    },
    tanggal_inspeksi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    kode_status: {
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
    },
    kode_trader: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nib: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nomor_bkp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tanggal_rencana_bongkar_kapal: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_ppm_kapal',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "nomor_aju_kapal" },
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
      name: "kd_prop",
      using: "BTREE",
      fields: [
        { name: "kd_prop" },
      ]
    },
    {
      name: "kd_kota",
      using: "BTREE",
      fields: [
        { name: "kd_kota" },
      ]
    },
    {
      name: "kode_upt",
      using: "BTREE",
      fields: [
        { name: "kode_upt" },
      ]
    },
    {
      name: "kode_status",
      using: "BTREE",
      fields: [
        { name: "kode_status" },
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

export default Tr_ppm_kapal;
