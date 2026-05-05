import { Sequelize } from "sequelize";
import { db_mutu } from "../config/database.js";
import Tb_skala_usaha_skp from "./tb_skala_usaha_skp.js";

const { DataTypes } = Sequelize;

const Tr_oss_proyek = db_mutu.define(
  "tr_oss_proyek",
  {
    idpryk: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    // ... field lainnya tetap sama ...
    nib: { type: DataTypes.STRING(13), allowNull: false, defaultValue: "" },
    id_proyek: { type: DataTypes.STRING(23), allowNull: false, defaultValue: "" },
    // ... (potong untuk ringkas, biarkan semua field Bapak tetap ada) ...
    sts_aktif: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    // Tambahkan field ini karena muncul di hasil View Bapak
    urutan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
  // --- BAGIAN YANG DIUBAH ---
  tableName: 'v_oss_proyek', // Merujuk ke View, bukan Tabel asli
  // --------------------------
  timestamps: false,
  freezeTableName: true, // Menjaga agar Sequelize tidak mengubah nama tabel jadi jamak
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{ name: "idpryk" }]
    },
  ]
});

Tr_oss_proyek.belongsTo(Tb_skala_usaha_skp, {
  foreignKey: 'skala_usaha',
  targetKey: 'kode_skala',
  as: 'skalaInfo'
});

export default Tr_oss_proyek;