import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;
export const Tr_inspeksi_teknis_rekom = db_kapal.define('tr_inspeksi_teknis_rekom',
  {
    id_inspeksi_evaluasi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_inspeksi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nomor_aju_kapal: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nip_evaluator: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nm_evaluator: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tgl_evaluasi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    catatan_evaluator: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grade_usul: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    id_jenis_komoditi: {
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
  tableName: 'tr_inspeksi_teknis_evaluasi',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_inspeksi_evaluasi" },
      ]
    },
    {
      name: "id_inspeksi",
      using: "BTREE",
      fields: [
        { name: "id_inspeksi" },
      ]
    },
    {
      name: "nomor_aju_kapal",
      using: "BTREE",
      fields: [
        { name: "nomor_aju_kapal" },
      ]
    },
  ]
});

export default Tr_inspeksi_teknis_rekom;