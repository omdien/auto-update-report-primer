import { Sequelize } from "sequelize";
import { db_report_kapal } from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_cbib_kapal = db_report_kapal.define(
    "tb_cbib_kapal",
    {
        id_cbib: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        no_cbib: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        nama_kapal: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        nib: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        alamat: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gt: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipe_kapal: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        tgl_permohonan: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tgl_spt: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tgl_awal_inspeksi: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tgl_akhir_inspeksi: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tgl_laporan: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        jenis_produk: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        grade_scpib: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        tgl_terbit: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tgl_kadaluarsa: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        upt_inspeksi: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        nama_pelabuhan: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        kode_provinsi: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        nama_provinsi: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status_pemasok: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        nama_pemilik: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        telepon: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        nahkoda_kapal: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        jumlah_abk: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        alat_tangkap: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        no_siup: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        tgl_siup: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        no_kbli: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        no_skkp_bkp_nk: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        tgl_skkp_bkp_nk: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        pj_pusat: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
    sequelize: db_report_kapal,
    tableName: "tb_cbib_kapal",
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_cbib" }
            ]
        },
        {
            name: "uq_no_cbib",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "no_cbib" }
            ]
        }
    ]
}
);

export default Tb_cbib_kapal;