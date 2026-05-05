import { Sequelize } from "sequelize";
import { db_mutu } from "../config/database.js";
import Tb_propinsi from "./tb_propinsi.js";
import V_oss_header from "./v_oss_header.js";
import Tr_pbumku_laporan_header from "./tr_pbumku_laporan_header.js";
import Tr_pbumku_laporan_lampiran from "./tr_pbumku_laporan_lampiran.js";
import Tr_pbumku_laporan_file from "./tr_pbumku_laporan_file.js";
import Tr_oss_proyek from "./tr_oss_proyek.js"; // Import model proyek
import Tb_perizinan from "./tb_perizinan.js";

const { DataTypes } = Sequelize;

const Tr_oss_checklist = db_mutu.define(
  "tr_oss_checklist",
  {
    idchecklist: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_produk: {
      type: DataTypes.STRING(23),
      allowNull: false,
      defaultValue: ""
    },
    id_proyek: {
      type: DataTypes.STRING(23),
      allowNull: false,
      defaultValue: ""
    },
    id_izin: {
      type: DataTypes.STRING(23),
      allowNull: false,
      defaultValue: ""
    },
    jenis_izin: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: ""
    },
    kd_izin: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: ""
    },
    kd_daerah: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    nama_izin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    no_izin: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    tgl_izin: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    instansi: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    id_bidang_spesifik: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    bidang_spesifik: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    id_kewenangan: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    parameter_kewenangan: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    kewenangan: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    file_izin: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    file_izin_oss: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    flag_checklist: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    status_checklist: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "0"
    },
    flag_transaksional: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    flag_perpanjangan: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    kd_dokumen: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    nm_dokumen: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    nib: {
      type: DataTypes.STRING(13),
      allowNull: false,
      defaultValue: ""
    },
    tgl_insert: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sts_aktif: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    tgl_permohonan: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_oss_checklist',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idchecklist" },
      ]
    },
  ]
});

// Relasi dengan propinsi
// Tr_oss_checklist.belongsTo(Tb_propinsi, {
//   foreignKey: "kd_daerah", // Ini formalitas agar tidak error
//   targetKey: "KODE_PROPINSI",
//   as: "propinsi"
// });

// Relasi dengan header OSS
Tr_oss_checklist.belongsTo(V_oss_header, {
  foreignKey: "nib",
  targetKey: "nib",
  as: "v_oss_header",
});

// Relasi dengan laporan lampiran (komoditas)
Tr_oss_checklist.belongsTo(Tr_pbumku_laporan_lampiran, {
  foreignKey: "idchecklist",
  targetKey: "idchecklist",
});

// Relasi dengan laporan header
Tr_oss_checklist.belongsTo(Tr_pbumku_laporan_header, {
  foreignKey: "idchecklist",
  targetKey: "idchecklist",
});

Tr_oss_checklist.belongsTo(Tr_oss_proyek, {
  foreignKey: "id_proyek", // kolom di tr_oss_checklist
  targetKey: "id_proyek",  // kolom di tr_oss_proyek
  as: "v_oss_proyek",
});

// Relasi: kd_izin di checklist merujuk ke kd_izin di tb_perizinan
Tr_oss_checklist.belongsTo(Tb_perizinan, {
    foreignKey: "kd_izin",
    targetKey: "kd_izin",
    as: "ref_perizinan" // Alias untuk digunakan saat include
});

export default Tr_oss_checklist;
