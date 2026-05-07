import { Sequelize } from "sequelize";
import { db_mutu } from "../../config/database.js";

const { DataTypes } = Sequelize;

const V_oss_header = db_mutu.define(
  "v_oss_header",
  {
    nib: {
      type: DataTypes.STRING(13),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
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
  }, {
  Sequelize,
  tableName: 'v_oss_header',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "nib" },
      ]
    },
  ]
});

export default V_oss_header;