import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_pelabuhan_pendaratan = db_kapal.define(
  "tb_pelabuhan_pendaratan",
  {
    kode_pelabuhan: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    nama_pelabuhan: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    koordinat: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    kode_propinsi: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    lokasi_pelabuhan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jenis_pelabuhan: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tb_pelabuhan_pendaratan',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "kode_pelabuhan" },
      ]
    },
    {
      name: "kode_propinsi",
      using: "BTREE",
      fields: [
        { name: "kode_propinsi" },
      ]
    },
    {
      name: "nama_pelabuhan",
      using: "BTREE",
      fields: [
        { name: "nama_pelabuhan" },
      ]
    },
  ]
});

export default Tb_pelabuhan_pendaratan;
