import { Sequelize } from "sequelize";
import { db_mutu } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tr_oss_header = db_mutu.define(
  "tr_oss_header",
  {
    idoss: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    nib: {
      type: DataTypes.STRING(13),
      allowNull: false,
      defaultValue: ""
    },
    tgl_pengajuan_nib: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tgl_terbit_nib: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tgl_perubahan_nib: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    oss_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    jenis_pelaku_usaha: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    no_npp: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    no_va: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ""
    },
    no_wlkp: {
      type: DataTypes.STRING(22),
      allowNull: false,
      defaultValue: ""
    },
    flag_perusahaan: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    flag_ekspor: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    flag_impor: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    jenis_api: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    gabung_negara: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    negara_pma_dominan: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    total_pma: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    nilai_pma_dominan: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    nilai_pmdn: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    persen_pma: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    persen_pmdn: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    versi_pia: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    skala_usaha: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    jangka_waktu: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    status_badan_hukum: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    status_penanaman_modal: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    npwp_perseroan: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ""
    },
    nama_perseroan: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    nama_singkatan: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    jenis_perseroan: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    status_perseroan: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    alamat_perseroan: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    rt_rw_perseroan: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ""
    },
    kelurahan_perseroan: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ""
    },
    perseroan_daerah_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    kode_pos_perseroan: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    nomor_telpon_perseroan: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    email_perusahaan: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    dalam_bentuk_uang: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    dalam_bentuk_lain: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    total_modal_dasar: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    total_modal_ditempatkan: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: "0"
    },
    flag_umk: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    },
    jenis_perubahan_terakhir: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    no_pengesahan: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    tgl_pengesahan: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    tgl_insert: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sts_aktif: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ""
    }
  }, {
  Sequelize,
  tableName: 'tr_oss_header',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idoss" },
      ]
    },
  ]
});

export default Tr_oss_header;