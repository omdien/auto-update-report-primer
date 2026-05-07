import { Sequelize } from "sequelize";
import { db_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;
const Tr_sertifikat_kapal_produk = db_kapal.define('tr_sertifikat_kapal_produk',
  {
    id_sert_produk: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sert: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nomor_aju_kapal: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    id_komoditi: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_sertifikat_kapal_produk',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_sert_produk" },
      ]
    },
    {
      name: "id_sert",
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
  ]
});

export default Tr_sertifikat_kapal_produk;