import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

export const Tr_inspeksi_teknis_rekom = db_kapal.define('tr_inspeksi_teknis_rekom', 
  {
    id_inspeksi_rekom: {
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
    nip_rekom: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nm_rekom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tgl_rekom: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_kesimpulan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    catatan_rekom: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grade_rekom: {
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
    tableName: 'tr_inspeksi_teknis_rekom',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_inspeksi_rekom" },
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